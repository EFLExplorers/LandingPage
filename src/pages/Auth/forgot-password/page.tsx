import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../utils/supabaseClient";
import { FormInput } from "../../../components/auth/shared/FormInput";
import { AuthContainer } from "../../../components/auth/layout/AuthContainer";
import sharedStyles from "../../../components/auth/styles/shared.module.css";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );

      if (resetError) throw resetError;

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
        title="Check Your Email"
        subtitle="We've sent you a password reset link"
      >
        <div className={sharedStyles.messageBox}>
          <p>
            We've sent a password reset link to <strong>{email}</strong>.
          </p>
          <p>
            Please check your email and click the link to reset your password.
            The link will expire in 1 hour.
          </p>
        </div>
        <div className={sharedStyles.links}>
          <Link href="/Auth/login" className={sharedStyles.link}>
            Return to Login
          </Link>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
    >
      <form onSubmit={handleSubmit} className={sharedStyles.form}>
        {error && <div className={sharedStyles.error}>{error}</div>}

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" className={sharedStyles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage; 