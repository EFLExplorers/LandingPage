import styles from "./ServicesSection.module.css";

export const ServicesSection = () => {
  const services = [
    {
      title: "Student Portal",
      description:
        "Our lessons make learning feel like an exciting adventure, where young learners can explore and grow. Each lesson keeps students feeling they're in class.",
      icon: "🎓",
      backgroundIcons: ["📖", "✏️", "🎯"],
    },
    {
      title: "Teacher Resources",
      description:
        "Access a comprehensive library of teaching materials, lesson plans, and interactive activities designed to make your ESL classes more engaging and effective.",
      icon: "📚",
      backgroundIcons: ["📝", "🎨", "🔍"],
    },
    {
      title: "Interactive Learning",
      description:
        "Engage students with our interactive games and exploration features that make learning English fun while building confidence.",
      icon: "🎮",
      backgroundIcons: ["🎲", "🏆", "⭐"],
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor student progress with detailed analytics and personalized learning paths that adapt to each student's needs.",
      icon: "📊",
      backgroundIcons: ["📈", "🎯", "🏅"],
    },
    {
      title: "Assessment Tools",
      description:
        "Comprehensive evaluation tools and quizzes that help measure learning outcomes and identify areas for improvement in real-time.",
      icon: "✅",
      backgroundIcons: ["📋", "🎯", "📝"],
    },
    {
      title: "Communication Hub",
      description:
        "Foster collaboration between students, teachers, and parents with our integrated messaging and feedback system.",
      icon: "💬",
      backgroundIcons: ["📱", "📧", "👥"],
    },
  ];

  return (
    <section className={styles.services}>
      <div className={styles.content}>
        <h2 className={styles.title}>Our Services</h2>
        <p className={styles.subtitle}>
          Discover how we make learning English an exciting journey for both
          students and teachers
        </p>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              {service.backgroundIcons.map((bgIcon, bgIndex) => (
                <div key={bgIndex} className={`${styles.backgroundIcon} ${styles[`backgroundIcon${bgIndex + 1}`]}`}>
                  {bgIcon}
                </div>
              ))}
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <button className={styles.learnMore}>Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
