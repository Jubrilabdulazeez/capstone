import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { PasswordUtils } from "@/lib/auth";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("🔐 Authorization attempt for:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              name: true,
              role: true,
              password: true,
              requirePasswordChange: true,
              image: true
            }
          });

          if (!user) {
            console.log("❌ User not found:", credentials.email);
            return null;
          }

          // Check if user has a password (for counselors and students with direct auth)
          if (!user.password) {
            console.log("❌ User has no password (OAuth only):", credentials.email);
            return null;
          }

          // Verify password
          const isPasswordValid = await PasswordUtils.verify(credentials.password, user.password);
          
          if (!isPasswordValid) {
            console.log("❌ Invalid password for user:", credentials.email);
            return null;
          }

          console.log("✅ User authenticated successfully:", user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name || `${user.firstName} ${user.lastName}`,
            role: user.role.toLowerCase(),
            requirePasswordChange: user.requirePasswordChange,
            image: user.image,
          };
        } catch (error) {
          console.log("❌ Database error during authentication:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.requirePasswordChange = user.requirePasswordChange;
        console.log("🎫 JWT created for user:", user.email, "role:", user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.requirePasswordChange = token.requirePasswordChange as boolean;
        console.log("🔑 Session created for user:", session.user.email, "role:", session.user.role);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("🔄 Redirect callback - url:", url, "baseUrl:", baseUrl);

      // If URL is relative, make it absolute
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // If URL is on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Default to baseUrl
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "educonnect-africa-secret-key-development-only",
});

export { handler as GET, handler as POST };
