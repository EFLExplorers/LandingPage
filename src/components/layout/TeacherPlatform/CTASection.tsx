import styles from "./CTASection.module.css";

export const TeacherCTASection = () => {
  return (
    <section className={styles.cta}>
      <h2>Join our community of EFL educators today!</h2>
      <p>Start creating engaging lessons and inspiring your students to master English</p>
      <button className={styles.registerButton}>Register as Teacher</button>
    </section>
  );
}; 