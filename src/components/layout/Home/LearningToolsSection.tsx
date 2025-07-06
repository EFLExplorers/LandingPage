import styles from "./LearningToolsSection.module.css";

export const LearningToolsSection = () => {
  const tools = [
    {
      title: "Interactive Games",
      description:
        "Engage with our collection of fun, educational games that make learning English enjoyable and effective.",
      icon: "🎮",
    },
    {
      title: "Digital Flashcards",
      description:
        "Master vocabulary and grammar with our interactive flashcard system that adapts to your learning progress.",
      icon: "🎴",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and personalized learning paths.",
      icon: "📊",
    },
    {
      title: "Practice Exercises",
      description:
        "Reinforce your learning with a variety of exercises designed to improve your English skills.",
      icon: "✍️",
    },
    {
      title: "Audio Resources",
      description:
        "Improve your pronunciation and listening skills with our comprehensive audio library.",
      icon: "🎧",
    },
    {
      title: "Video Lessons",
      description:
        "Learn through engaging video content that brings English to life in real-world contexts.",
      icon: "🎥",
    },
  ];

  return (
    <section className={styles.tools}>
      <div className={styles.content}>
        <h2 className={styles.title}>Learning Tools</h2>
        <p className={styles.subtitle}>
          Discover our comprehensive suite of tools designed to make learning
          English engaging and effective
        </p>

        <div className={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <div key={index} className={styles.toolCard}>
              <div className={styles.toolIcon}>{tool.icon}</div>
              <h3 className={styles.toolTitle}>{tool.title}</h3>
              <p className={styles.toolDescription}>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningToolsSection;
