"use client";

import { useSession } from "next-auth/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthTestPage() {
  const { data: session, status } = useSession();

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Session Status:</h3>
              <p className="text-sm bg-muted p-2 rounded">
                Status: {status}
              </p>
            </div>

            {session ? (
              <div>
                <h3 className="font-semibold mb-2">Session Data:</h3>
                <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
                <Button onClick={() => signOut()} className="mt-4">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div>
                <p>No session found</p>
                <Button onClick={() => signIn("credentials", {
                  email: "test@test.com",
                  password: "password"
                })}>
                  Demo Login
                </Button>
              </div>
            )}

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Test Links:</h3>
              <div className="space-x-2">
                <Button asChild variant="outline">
                  <Link href="/counseling">Counseling Page</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/counseling/book/counselor-001">Book Session</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/profile">Profile</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
