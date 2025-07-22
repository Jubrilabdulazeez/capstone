"use client";

import { getSession } from "next-auth/react";

export async function refreshSession() {
  // Force refresh of the session
  const session = await getSession();
  return session;
}