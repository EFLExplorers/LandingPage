import { useEffect } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import HeroSection from "../components/layout/Home/HeroSection";
import TaglineSection from "../components/layout/Home/TaglineSection";
import LearningToolsSection from "../components/layout/Home/LearningToolsSection";
import ServicesSection from "../components/layout/Home/ServicesSection";
import { PricingSection } from "../components/layout/Home/PricingSection";
import { RegisterCTASection } from "../components/layout/Home/RegisterCTASection";
import { scrollToTop } from "../utils/scrollToTop";

export const HomePage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      <TaglineSection />
      <LearningToolsSection />
      <ServicesSection />
      <PricingSection />
      <RegisterCTASection />
    </PageLayout>
  );
};

export default HomePage;
