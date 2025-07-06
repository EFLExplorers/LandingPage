import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import styles from "@/components/auth/styles/AuthForm.module.css";

export const PlatformLoginPage = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const { platform } = router.query;

  useEffect(() => {
    if (router.isReady && platform !== "student" && platform !== "teacher") {
      setIsValid(false);
      router.push("/Auth/login");
    }
  }, [router.isReady, platform, router]);

  if (!router.isReady) {
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          {platform === "student" ? "Student Login" : "Teacher Login"}
        </h1>
        <LoginForm platform={platform as "student" | "teacher"} />
      </div>
    </div>
  );
};

export default PlatformLoginPage;
