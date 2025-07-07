import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../../utils/supabaseClient";
import { PasswordInput } from "../../../components/auth/shared/PasswordInput";
import { AuthContainer } from "../../../components/auth/layout/AuthContainer";
import sharedStyles from "../../../components/auth/styles/shared.module.css";

export const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has a valid session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthContainer
        title="Password Updated"
        subtitle="Your password has been successfully reset"
      >
        <div className={sharedStyles.messageBox}>
          <p>
            Your password has been successfully updated. You can now log in with
            your new password.
          </p>
        </div>
        <div className={sharedStyles.links}>
          <Link href="/Auth/login" className={sharedStyles.link}>
            Go to Login
          </Link>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      title="Reset Password"
      subtitle="Enter your new password"
    >
      <form onSubmit={handleSubmit} className={sharedStyles.form}>
        {error && <div className={sharedStyles.error}>{error}</div>}

        <PasswordInput
          id="password"
          name="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          showStrength={true}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" className={sharedStyles.button} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>

        <div className={sharedStyles.links}>
          <Link href="/Auth/login" className={sharedStyles.link}>
            Back to Login
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
};

export default ResetPasswordPage; 