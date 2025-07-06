import {
  TeacherHeroSection,
  TeachingToolsSection,
  LessonModulesSection,
  TeacherBenefitsSection,
  TeacherCTASection,
} from "@/components/layout/TeacherPlatform";
import styles from "./teacher.module.css";

export default function TeacherPlatform() {
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

