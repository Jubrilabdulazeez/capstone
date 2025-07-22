"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { refreshSession } from "@/lib/auth-utils";

export default function SimpleAuthTest() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: "test@test.com",
        password: "password",
        redirect: false,
      });

      console.log("Login result:", result);

      if (result?.ok) {
        alert("Login successful!");
        // Force page reload to update session
        window.location.reload();
      } else {
        alert("Login failed: " + (result?.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Simple Authentication Test</h1>

      <div style={{ background: "#f0f0f0", padding: "15px", margin: "10px 0" }}>
        <h3>Session Status: {status}</h3>
        {session ? (
          <div>
            <p><strong>User:</strong> {session.user?.name}</p>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <p><strong>Role:</strong> {session.user?.role}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
                Sign Out
              </button>
              <button
                onClick={async () => {
                  await refreshSession();
                  window.location.reload();
                }}
                style={{ padding: "10px 20px", background: "#f0f0f0" }}
              >
                🔄 Refresh Session
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              style={{ padding: "10px 20px", marginTop: "10px" }}
            >
              {isLoading ? "Signing in..." : "Demo Login (test@test.com)"}
            </button>
          </div>
        )}
      </div>

      <div style={{ background: "#e0f0ff", padding: "15px", margin: "10px 0" }}>
        <h3>Test Links:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link href="/counseling" style={{ padding: "8px 16px", background: "#007bff", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Counseling Page
          </Link>
          <Link href="/counseling/book/counselor-001" style={{ padding: "8px 16px", background: "#28a745", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Book Session (Protected)
          </Link>
          <Link href="/profile" style={{ padding: "8px 16px", background: "#6c757d", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Profile (Protected)
          </Link>
        </div>
      </div>

      <div style={{ background: "#fff3cd", padding: "15px", margin: "10px 0" }}>
        <h3>Debug Info:</h3>
        <pre style={{ background: "white", padding: "10px", fontSize: "12px" }}>
          {JSON.stringify({
            status,
            session: session ? {
              name: session.user?.name,
              email: session.user?.email,
              role: session.user?.role
            } : null,
            timestamp: new Date().toISOString()
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
