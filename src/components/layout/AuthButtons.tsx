"use client";

import Link from "next/link";
import styles from "./AuthButtons.module.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const AuthButtonsContent = () => {
  return (
    <div className={styles.authButtons}>
      <Link href="/Auth/login" className={styles.loginButton}>
        Login
      </Link>
      <Link href="/Auth/register" className={styles.registerButton}>
        Get Started
      </Link>
    </div>
  );
};

export const AuthButtons = () => {
  return (
    <ErrorBoundary>
      <AuthButtonsContent />
    </ErrorBoundary>
  );
};

export { AuthButtons as default };
