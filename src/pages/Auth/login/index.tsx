import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";

export const LoginPage = () => {
  const router = useRouter();

  const handlePlatformSelect = (platform: "student" | "teacher" | "admin") => {
    if (platform === "admin") {
      router.push(`/Auth/login/admin`);
    } else {
      router.push(`/Auth/login/${platform}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Select your platform to continue:</p>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePlatformSelect("student")}
            className={`${styles.button} ${styles.studentButton}`}
          >
            📚 Student Login
          </button>
          <button
            onClick={() => handlePlatformSelect("teacher")}
            className={`${styles.button} ${styles.teacherButton}`}
          >
            👨‍🏫 Teacher Login
          </button>
        </div>
        
        <div className={styles.adminSection}>
          <div className={styles.separator}>
            <span>Administrative Access</span>
          </div>
          <button
            onClick={() => handlePlatformSelect("admin")}
            className={`${styles.button} ${styles.adminButton}`}
          >
            Admin Login
          </button>
        </div>

        <p className={styles.registerLink}>
          New to ESL Explorers?{" "}
          <Link href="/Auth/register" className={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 