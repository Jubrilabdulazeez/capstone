"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import type { User } from "@/lib/types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
  isCounselor: boolean;
  isStudent: boolean;
  hasPermission: (permission: string) => boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const isLoading = status === "loading" || !isMounted;

  // Transform NextAuth session to our User format
  const user: User | null = session?.user ? {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.name?.split(' ')[0] || '',
    lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
    nationality: "Nigerian",
    verified: true,
    role: (session.user.role as 'Student' | 'Admin' | 'Counselor') || 'Student',
    createdAt: new Date().toISOString(),
    profilePicture: session.user.image || undefined,
    qualifications: [],
    languageProficiencies: [
      {
        language: "English",
        level: "Native",
      }
    ],
    studyPreferences: {
      fieldsOfInterest: [],
      preferredCountries: [],
      preferredDegreeTypes: [],
      preferredLanguages: ["English"],
      budgetRange: {
        min: 0,
        max: 20000,
      },
      accommodationPreference: "No Preference",
      startDate: "Flexible",
      studyMode: "No Preference",
      scholarshipRequired: false,
    },
    savedUniversities: [],
    applications: [],
    counselingSessions: [],
  } : null;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return result?.ok || false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Call the registration API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          nationality: 'Nigerian',
          acceptTerms: true
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Registration failed:', error);
        return false;
      }

      // After successful registration, automatically sign them in
      const result = await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirect: false,
      });

      return result?.ok || false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  // Role-based helpers
  const isAdmin = user?.role === 'Admin';
  const isCounselor = user?.role === 'Counselor';
  const isStudent = user?.role === 'Student';

  // Permission checking (simplified version)
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'Admin') return true;
    
    // Define role-based permissions
    const rolePermissions = {
      'Student': ['read_profile', 'update_profile', 'read_universities', 'create_application'],
      'Counselor': ['read_profile', 'update_profile', 'read_universities', 'manage_sessions'],
      'Admin': ['*'] // All permissions
    };
    
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes('*');
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <AuthContext.Provider value={{ 
        user: null, 
        login: async () => false, 
        register: async () => false, 
        logout: () => {}, 
        isLoading: true,
        isAdmin: false,
        isCounselor: false,
        isStudent: false,
        hasPermission: () => false
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      isAdmin,
      isCounselor,
      isStudent,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
