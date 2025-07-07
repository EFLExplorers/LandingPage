import styles from "./ContactHeroSection.module.css";

export const ContactHeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have questions about our English learning programs? We're here to help! 
          Reach out to us and let's start your learning journey together.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.infoItem}>
            <span className={styles.icon}>📍</span>
            <div className={styles.infoText}>
              123 Learning Street, Education City, EC 12345
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>📧</span>
            <div className={styles.infoText}>
              <a href="mailto:contact@eslexplorers.com">contact@eslexplorers.com</a>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>📞</span>
            <div className={styles.infoText}>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 