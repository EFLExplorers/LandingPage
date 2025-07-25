import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import { scrollToTop } from "../../../utils/scrollToTop";

export const RegisterPage = () => {
  const router = useRouter();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handlePlatformSelect = (platform: "student" | "teacher") => {
    router.push(`/Auth/register/${platform}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Join ESL Explorers</h1>
        <p className={styles.subtitle}>Choose your account type:</p>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePlatformSelect("student")}
            className={`${styles.button} ${styles.studentButton}`}
          >
            📚 Register as Student
          </button>
          <button
            onClick={() => handlePlatformSelect("teacher")}
            className={`${styles.button} ${styles.teacherButton}`}
          >
            👨‍🏫 Register as Teacher
          </button>
        </div>

        <div className={styles.registerLink}>
          Already have an account?{" "}
          <Link href="/Auth/login" className={styles.link}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 