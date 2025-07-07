import styles from "./RegisterCTASection.module.css";
import Link from "next/link";

export const RegisterCTASection = () => {
  return (
    <section className={styles.registerCta}>
      <div className={styles.registerCtaContent}>
        <h2 className={styles.registerCtaTitle}>
          Ready to Start Your English Learning Journey?
        </h2>
        <p className={styles.registerCtaSubtitle}>
          Join our community of learners and get access to all our premium
          features.
        </p>
        <Link href="/Auth/register" className={styles.registerCtaButton}>
          Create Your Account
        </Link>
      </div>
    </section>
  );
};
