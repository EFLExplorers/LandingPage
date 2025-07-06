import styles from "./TeachingToolsSection.module.css";
import Image from "next/image";

const teachingTools = [
  {
    name: "Lesson Planner",
    description: "Create and customize engaging lesson plans with our comprehensive toolkit",
    icon: "📝",
    image: "/assets/images/characters/Luke.png",
  },
  {
    name: "Student Analytics",
    description: "Track student progress with detailed reports and performance insights",
    icon: "📊",
    image: "/assets/images/characters/Cassidy.png",
  },
  {
    name: "Interactive Resources",
    description: "Access a library of multimedia materials, games, and activities",
    icon: "🎮",
    image: "/assets/images/characters/Riley.png",
  },
  {
    name: "Assessment Tools",
    description: "Create quizzes, tests, and assignments with automated grading",
    icon: "✅",
    image: "/assets/images/characters/Emma.png",
  },
];

export const TeachingToolsSection = () => {
  return (
    <section className={styles.characters}>
      <div className={styles.characterContent}>
        <div className={styles.characterGridContainer}>
          <p className={styles.characterText}>
            Everything you need to create engaging ESL lessons is at your fingertips. 
            Our platform provides comprehensive tools designed specifically for English language teachers, 
            allowing you to focus on what you do best - inspiring students to learn.
          </p>
          <div className={styles.characterGrid}>
            {teachingTools.map((tool, index) => (
              <div key={index} className={styles.characterCircle}>
                <div className={styles.toolImage}>
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={80}
                    height={80}
                    className={styles.characterImage}
                  />
                </div>
                <div className={styles.toolInfo}>
                  <h4>{tool.name}</h4>
                  <p>{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.featureText}>
          <p>
            With pre-designed lesson plans for every proficiency level, you can spend less time 
            preparing materials and more time connecting with your students. Our platform includes 
            interactive activities, assessment tools, and progress tracking that help you deliver 
            effective, engaging lessons while monitoring student development. Join thousands of 
            teachers who are already transforming their ESL classrooms with our innovative platform.
          </p>
        </div>
      </div>
    </section>
  );
}; 