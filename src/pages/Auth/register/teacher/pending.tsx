import Link from "next/link";
import styles from "@/styles/Auth.module.css";

export const TeacherPendingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Registration Pending</h1>
        <div className={styles.messageBox}>
          <p>
            Thank you for registering as a teacher with ESL Explorers. Your
            application is currently under review.
          </p>
          <p>
            Our admin team will verify your credentials and approve your
            account. You will receive an email notification once your account
            has been approved.
          </p>
          <p>Please note that this process may take 1-2 business days.</p>
        </div>
        <div className={styles.buttonGroup}>
          <Link href="/Auth/login" className={styles.button}>
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherPendingPage;
