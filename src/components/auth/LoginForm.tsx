import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import styles from "./styles/AuthForm.module.css";
import Link from "next/link";
import { Button } from "../ui/Button/Button";
import { useRouter } from "next/router";

interface LoginFormProps {
  platform: "student" | "teacher";
}

export const LoginForm = ({ platform }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Sign in attempt
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      // 2. Check user role and approval status
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, approved")
        .eq("id", data.user?.id)
        .single();

      if (userError || !userData) {
        throw new Error("Error retrieving user information");
      }

      if (userData.role !== platform) {
        throw new Error(
          `This account is registered as a ${userData.role}, not a ${platform}`
        );
      }

      if (!userData.approved) {
        throw new Error("Your account is pending approval");
      }

      // 3. Redirect based on role
      if (mounted) {
        router.push(`/platforms/${platform}`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <form onSubmit={handleLogin} className={styles.authForm}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <Button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      <Link href={`/Auth/register/${platform}`} className={styles.backLink}>
        Don&apos;t have an account? Register here
      </Link>
    </form>
  );
};
