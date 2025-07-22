import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/common/HeroSection";
import { FeatureHighlights } from "@/components/common/FeatureHighlights";
import { HowItWorks } from "@/components/common/HowItWorks";
import { Testimonials } from "@/components/common/Testimonials";
import { CallToAction } from "@/components/common/CallToAction";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureHighlights />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </MainLayout>
  );
}
