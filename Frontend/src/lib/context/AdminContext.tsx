"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "editor";
  permissions: string[];
  profilePicture?: string;
  lastLogin: string;
  createdAt: string;
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Admin permissions mapping
const getAdminPermissions = (email: string): string[] => {
  if (email === "superadmin@educonnect.africa") {
    return ["all"];
  }
  if (email === "admin@educonnect.africa") {
    return ["universities.read", "universities.write", "scholarships.read", "scholarships.write", "users.read", "users.write"];
  }
  return [];
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check for existing admin session only on client side
    const checkExistingSession = () => {
      try {
        const storedAdmin = localStorage.getItem("educonnect_admin");
        if (storedAdmin) {
          const parsedAdmin = JSON.parse(storedAdmin);
          setAdmin(parsedAdmin);
        }
      } catch (error) {
        console.error("Error parsing stored admin data:", error);
        localStorage.removeItem("educonnect_admin");
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <AdminContext.Provider value={{
        admin: null,
        isAuthenticated: false,
        isLoading: true,
        login: async () => false,
        logout: () => {},
        hasPermission: () => false,
      }}>
        {children}
      </AdminContext.Provider>
    );
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Call dedicated admin login API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('Admin login response:', { status: response.status, data });

      if (response.ok && data.success) {
        const adminData: Admin = {
          id: data.admin.id,
          email: data.admin.email,
          firstName: data.admin.firstName,
          lastName: data.admin.lastName,
          role: email === "superadmin@educonnect.africa" ? "super_admin" : "admin",
          permissions: getAdminPermissions(email),
          lastLogin: new Date().toISOString(),
          createdAt: data.admin.createdAt
        };

        setAdmin(adminData);
        localStorage.setItem("educonnect_admin", JSON.stringify(adminData));
        // Store admin token for future API calls
        localStorage.setItem("educonnect_admin_token", data.token);
        setIsLoading(false);
        return true;
      } else {
        console.error('Admin login failed:', data.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("educonnect_admin");
    localStorage.removeItem("educonnect_admin_token");
  };

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false;
    if (admin.permissions.includes("all")) return true;
    return admin.permissions.includes(permission);
  };

  const value: AdminContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    hasPermission,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
