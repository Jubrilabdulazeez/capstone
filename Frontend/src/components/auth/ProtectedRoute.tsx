"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lock, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'Student' | 'Counselor' | 'Admin';
  requiredPermission?: string;
  fallbackPath?: string;
  showFallback?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requiredRole,
  requiredPermission,
  fallbackPath = '/auth/signin',
  showFallback = true
}: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (requireAuth && !user) {
      router.push(fallbackPath);
      return;
    }

    // Check role requirement
    if (requiredRole && user?.role !== requiredRole) {
      if (!showFallback) {
        router.push('/');
        return;
      }
    }

    // Check permission requirement
    if (requiredPermission && !hasPermission(requiredPermission)) {
      if (!showFallback) {
        router.push('/');
        return;
      }
    }
  }, [user, isLoading, requiredRole, requiredPermission, requireAuth, router, fallbackPath, showFallback, hasPermission]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication required fallback
  if (requireAuth && !user && showFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">
                You need to sign in to access this page.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => router.push('/auth/signin')}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="w-full"
                >
                  Go Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show role/permission denied fallback
  if (user && showFallback && (
    (requiredRole && user.role !== requiredRole) ||
    (requiredPermission && !hasPermission(requiredPermission))
  )) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <UserX className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You don't have permission to access this page.
                {requiredRole && (
                  <span className="block mt-2">
                    Required role: <strong>{requiredRole}</strong>
                  </span>
                )}
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="w-full"
                >
                  Go Home
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => router.back()}
                  className="w-full"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render children if all checks pass or fallback is disabled
  return <>{children}</>;
}

// Higher-order component for easy route protection
export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function AuthenticatedComponent(props: T) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Specific role guards
export function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="Admin">
      {children}
    </ProtectedRoute>
  );
}

export function CounselorRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="Counselor">
      {children}
    </ProtectedRoute>
  );
}

export function StudentRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="Student">
      {children}
    </ProtectedRoute>
  );
}