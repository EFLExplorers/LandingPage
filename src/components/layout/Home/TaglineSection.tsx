import styles from "./TaglineSection.module.css";

export const TaglineSection = () => {
  return (
    <section className={styles.tagline}>
      <div className={styles.content}>
        <h2 className={styles.title}>Explore the universe of language!</h2>
        <p className={styles.subtitle}>
          We provide teachers with stellar ESL resources and guide students on
          an exciting journey to English mastery!
        </p>
      </div>
    </section>
  );
};

export default TaglineSection;
