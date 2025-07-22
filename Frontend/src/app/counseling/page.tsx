"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CounselingHeader } from "@/components/counseling/CounselingHeader";
import { CounselorList } from "@/components/counseling/CounselorList";
import { CounselingInfo } from "@/components/counseling/CounselingInfo";
import { CounselingFAQ } from "@/components/counseling/CounselingFAQ";

export default function CounselingPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);

  return (
    <MainLayout>
      <div className="container py-8 max-w-7xl mx-auto">
        <CounselingHeader onServiceSelect={setSelectedServiceType} />

        <div className="grid gap-8 lg:grid-cols-4" id="counselors-list">
          <div className="lg:col-span-3">
            <CounselorList selectedServiceType={selectedServiceType} />
          </div>
          <div className="space-y-6">
            <CounselingInfo />
            <CounselingFAQ />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
