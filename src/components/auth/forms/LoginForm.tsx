import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../utils/supabaseClient";
import { FormInput } from "../shared/FormInput";
import { PasswordInput } from "../shared/PasswordInput";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { UserPlatform, AuthFormData } from "../types/auth.types";
import { validateLogin } from "../utils/authValidation";
import sharedStyles from "../styles/shared.module.css";

interface LoginFormProps {
  platform: UserPlatform;
}

export const LoginForm = ({ platform }: LoginFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (signInError) throw signInError;

      // Verify user role and approval status
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

      if (platform === "teacher" && !userData.approved) {
        throw new Error("Your teacher account is pending approval");
      }

      // Redirect to appropriate platform
      const platformUrl =
        platform === "teacher"
          ? process.env.NEXT_PUBLIC_TEACHER_URL
          : process.env.NEXT_PUBLIC_STUDENT_URL;

      window.location.href = `${platformUrl}/dashboard`;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={sharedStyles.form}>
      {error && <div className={sharedStyles.error}>{error}</div>}

      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <div className={sharedStyles.forgotPassword}>
        <Link href={`/Auth/forgot-password`} className={sharedStyles.link}>
          Forgot your password?
        </Link>
      </div>

      <button type="submit" className={sharedStyles.button} disabled={loading}>
        {loading ? (
          <>
            <LoadingSpinner size="sm" color="white" />
            <span>Logging in...</span>
          </>
        ) : (
          "Login"
        )}
      </button>

      <div className={sharedStyles.links}>
        <Link href={`/Auth/register/${platform}`} className={sharedStyles.link}>
          Don&apos;t have an account? Register here
        </Link>
      </div>
    </form>
  );
};
