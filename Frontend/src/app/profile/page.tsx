import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl mx-auto">
        <ProfileHeader />
        <ProfileStats />
        <ProfileTabs />
      </div>
    </MainLayout>
  );
}
