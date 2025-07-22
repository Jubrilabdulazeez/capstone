"use client";

import { useAdmin } from "@/lib/context/AdminContext";
import { AdminProvider } from "@/lib/context/AdminContext";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, isAuthenticated, isLoading, logout } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, isMounted, isLoginPage]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Show loading until mounted to prevent hydration mismatch
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center" suppressHydrationWarning>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4" suppressHydrationWarning></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If on login page, don't show the authenticated layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-3" />
            <div>
              <h1 className="text-xl font-bold">EduConnect Africa - Admin Dashboard</h1>
              <p className="text-green-100 text-sm">
                Welcome back, {admin?.firstName || 'Admin'} ({admin?.role})
              </p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      <div className="container py-6">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminProvider>
  );
}
