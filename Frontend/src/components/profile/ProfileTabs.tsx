"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileOverview } from "./ProfileOverview";
import { SavedUniversities } from "./SavedUniversities";
import { ApplicationsTab } from "./ApplicationsTab";
import { CounselingSessionsTab } from "./CounselingSessionsTab";
import { AcademicInfo } from "./AcademicInfo";
import { StudyPreferences } from "./StudyPreferences";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="saved">Saved</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
        <TabsTrigger value="counseling">Counseling</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <ProfileOverview />
      </TabsContent>

      <TabsContent value="academic" className="mt-6">
        <AcademicInfo />
      </TabsContent>

      <TabsContent value="preferences" className="mt-6">
        <StudyPreferences />
      </TabsContent>

      <TabsContent value="saved" className="mt-6">
        <SavedUniversities />
      </TabsContent>

      <TabsContent value="applications" className="mt-6">
        <ApplicationsTab />
      </TabsContent>

      <TabsContent value="counseling" className="mt-6">
        <CounselingSessionsTab />
      </TabsContent>
    </Tabs>
  );
}
