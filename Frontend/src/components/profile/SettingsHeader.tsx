"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export function SettingsHeader() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          Account Settings
        </CardTitle>
        <CardDescription>
          Manage your account information, preferences, and privacy settings
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
