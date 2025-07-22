"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalSettings } from "./PersonalSettings";
import { AcademicSettings } from "./AcademicSettings";
import { PreferencesSettings } from "./PreferencesSettings";
import { AccountSettings } from "./AccountSettings";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-6">
        <PersonalSettings />
      </TabsContent>

      <TabsContent value="academic" className="mt-6">
        <AcademicSettings />
      </TabsContent>

      <TabsContent value="preferences" className="mt-6">
        <PreferencesSettings />
      </TabsContent>

      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  );
}
