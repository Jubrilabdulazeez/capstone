import { MainLayout } from "@/components/layout/MainLayout";
import { CalculatorHeader } from "@/components/calculator/CalculatorHeader";
import { GradeCalculator } from "@/components/calculator/GradeCalculator";
import { CalculatorGuide } from "@/components/calculator/CalculatorGuide";
import { ApplicationLinks } from "@/components/calculator/ApplicationLinks";

export default function CalculatorPage() {
  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl mx-auto">
        <CalculatorHeader />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GradeCalculator />
          </div>
          <div className="space-y-6">
            <CalculatorGuide />
            <ApplicationLinks />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
