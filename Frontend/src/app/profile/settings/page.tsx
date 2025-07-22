import { MainLayout } from "@/components/layout/MainLayout";
import { SettingsHeader } from "@/components/profile/SettingsHeader";
import { SettingsTabs } from "@/components/profile/SettingsTabs";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="container py-8 max-w-4xl mx-auto">
        <SettingsHeader />
        <SettingsTabs />
      </div>
    </MainLayout>
  );
}
