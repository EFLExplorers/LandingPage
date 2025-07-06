import { useRouter } from "next/router";
import Link from "next/link";
import layoutStyles from "@/styles/auth/layout.module.css";
import componentStyles from "@/styles/auth/components.module.css";

export const RegisterPage = () => {
  const router = useRouter();

  const handlePlatformSelect = (platform: "student" | "teacher") => {
    router.push(`/Auth/register/${platform}`);
  };

  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.formContainer}>
        <h1 className={layoutStyles.title}>Join ESL Explorers</h1>
        <p className={layoutStyles.subtitle}>Choose your account type:</p>

        <div className={componentStyles.buttonGroup}>
          <button
            onClick={() => handlePlatformSelect("student")}
            className={componentStyles.button}
          >
            Register as Student
          </button>
          <button
            onClick={() => handlePlatformSelect("teacher")}
            className={componentStyles.button}
          >
            Register as Teacher
          </button>
        </div>

        <div className={componentStyles.links}>
          <Link href="/Auth/login">Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
