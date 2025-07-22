"use client";

import { useState, useEffect, ReactNode } from "react";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AdminProvider } from "@/lib/context/AdminContext";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <AdminProvider>
        {children}
      </AdminProvider>
    </AuthProvider>
  );
}