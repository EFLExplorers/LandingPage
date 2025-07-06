import { useState } from "react";
import styles from "./LessonModulesSection.module.css";

const lessonModules = [
  { 
    name: "Beginner", 
    color: "var(--theme-muted)", 
    students: "25-30",
    description: "Perfect for students with little to no English experience",
    lessons: "120+ lessons",
    duration: "6-8 months"
  },
  { 
    name: "Elementary", 
    color: "var(--accent)", 
    students: "20-25",
    description: "Building foundational vocabulary and basic grammar skills",
    lessons: "150+ lessons",
    duration: "8-10 months"
  },
  { 
    name: "Pre-Intermediate", 
    color: "var(--text-secondary)", 
    students: "18-22",
    description: "Developing conversational skills and intermediate grammar",
    lessons: "180+ lessons",
    duration: "10-12 months"
  },
  { 
    name: "Intermediate", 
    color: "var(--theme-foreground)", 
    students: "15-20",
    description: "Enhancing fluency and expanding vocabulary range",
    lessons: "200+ lessons",
    duration: "12-15 months"
  },
  { 
    name: "Upper-Intermediate", 
    color: "var(--theme-muted-foreground)", 
    students: "12-18",
    description: "Advanced communication skills and complex grammar structures",
    lessons: "220+ lessons",
    duration: "15-18 months"
  },
  { 
    name: "Advanced", 
    color: "var(--primary-three)", 
    students: "10-15",
    description: "Mastery of English for academic and professional contexts",
    lessons: "250+ lessons",
    duration: "18-24 months"
  },
  { 
    name: "Business English", 
    color: "var(--secondary-hover)", 
    students: "8-12",
    description: "Specialized vocabulary and skills for professional environments",
    lessons: "100+ lessons",
    duration: "6-8 months"
  },
  { 
    name: "Exam Prep", 
    color: "var(--primary-two)", 
    students: "6-10",
    description: "Focused preparation for IELTS, TOEFL, and Cambridge exams",
    lessons: "80+ lessons",
    duration: "4-6 months"
  },
  { 
    name: "Conversation", 
    color: "var(--secondary)", 
    students: "5-8",
    description: "Fluency-focused speaking practice and cultural exchange",
    lessons: "60+ lessons",
    duration: "3-4 months"
  },
  { 
    name: "Specialized", 
    color: "var(--text-muted)", 
    students: "3-6",
    description: "Customized content for specific industries or interests",
    lessons: "40+ lessons",
    duration: "2-3 months"
  },
];

export const LessonModulesSection = () => {
  const [selectedModule, setSelectedModule] = useState(0);

  return (
    <section className={styles.planets}>
      <h2>Explore our lesson modules</h2>
      <p className={styles.modulesSubtitle}>
        Choose from our comprehensive range of ESL modules designed for every proficiency level
      </p>
      
      <div className={styles.modulesGrid}>
        {lessonModules.map((module, index) => (
          <div 
            key={module.name} 
            className={`${styles.moduleCard} ${selectedModule === index ? styles.selectedModule : ''}`}
            onClick={() => setSelectedModule(index)}
            style={{ borderLeftColor: module.color }}
          >
            <div className={styles.moduleHeader}>
              <h3 className={styles.moduleName}>{module.name}</h3>
              <div className={styles.moduleBadge} style={{ backgroundColor: module.color }}>
                {module.students}
              </div>
            </div>
            <p className={styles.moduleDescription}>{module.description}</p>
            <div className={styles.moduleDetails}>
              <div className={styles.moduleDetail}>
                <span className={styles.detailLabel}>Lessons:</span>
                <span className={styles.detailValue}>{module.lessons}</span>
              </div>
              <div className={styles.moduleDetail}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>{module.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.selectedModuleInfo}>
        <h3>Selected Module: {lessonModules[selectedModule].name}</h3>
        <p>{lessonModules[selectedModule].description}</p>
        <div className={styles.moduleStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Recommended Class Size</span>
            <span className={styles.statValue}>{lessonModules[selectedModule].students} students</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Lessons</span>
            <span className={styles.statValue}>{lessonModules[selectedModule].lessons}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Typical Duration</span>
            <span className={styles.statValue}>{lessonModules[selectedModule].duration}</span>
          </div>
        </div>
      </div>
    </section>
  );
}; 