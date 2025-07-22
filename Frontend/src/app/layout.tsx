import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import NextAuthProvider from '@/components/providers/NextAuthProvider';
import ClientProviders from '@/components/providers/ClientProviders';
import HydrationErrorSuppressor from '@/components/common/HydrationErrorSuppressor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduConnect Africa - Connecting Nigerian Students with African Universities',
  description: 'Discover personalized university recommendations, qualification equivalency information, and education counseling services across Africa.',
  keywords: ['education', 'universities', 'Africa', 'Nigeria', 'study abroad', 'counseling'],
  authors: [{ name: 'EduConnect Africa' }],
  openGraph: {
    title: 'EduConnect Africa',
    description: 'Connecting Nigerian Students with African Universities',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Early hydration error suppression
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                const originalWarn = console.warn;
                
                const shouldSuppress = (msg) => {
                  return typeof msg === 'string' && (
                    msg.includes('hydration') ||
                    msg.includes('bis_skin_checked') ||
                    msg.includes('server rendered HTML') ||
                    msg.includes('browser extension')
                  );
                };
                
                console.error = (...args) => {
                  if (shouldSuppress(args[0])) return;
                  originalError.apply(console, args);
                };
                
                console.warn = (...args) => {
                  if (shouldSuppress(args[0])) return;
                  originalWarn.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <HydrationErrorSuppressor />
        <NextAuthProvider>
          <ClientProviders>
            {children}
            <Toaster />
            <SonnerToaster />
          </ClientProviders>
        </NextAuthProvider>
      </body>
    </html>
  );
}
