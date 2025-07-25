import { useEffect } from "react";
import {
  TeacherHeroSection,
  TeachingToolsSection,
  LessonModulesSection,
  TeacherBenefitsSection,
  TeacherCTASection,
} from "@/components/layout/TeacherPlatform";
import styles from "./teacher.module.css";
import { scrollToTop } from "../../utils/scrollToTop";

export default function TeacherPlatform() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className={styles.main}>
      <TeacherHeroSection />
      <TeachingToolsSection />
      <LessonModulesSection />
      <TeacherBenefitsSection />
      <TeacherCTASection />
    </main>
  );
}

