import { LoginForm } from "@/components/auth/forms";
import styles from "@/styles/Auth.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Welcome back to ESL Explorers</p>
        </div>
        <LoginForm />
        <div className={styles.registerLink}>
          Don&apos;t have an account?{' '}
          <a href="/Auth/register" className={styles.link}>
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
