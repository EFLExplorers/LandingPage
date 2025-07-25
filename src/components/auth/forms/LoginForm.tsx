import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../auth/supabaseClient";
import { FormInput } from "../shared/FormInput";
import { PasswordInput } from "../shared/PasswordInput";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { UserPlatform, AuthFormData } from "../types/auth.types";
import { validateLogin } from "../utils/authValidation";
import sharedStyles from "../styles/shared.module.css";
import { debugUserProfile } from "../../../utils/debugUserProfile";

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
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

      // Fetch user role and approval status
      console.log("🔍 Fetching user profile for ID:", data.user?.id);
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, approved")
        .eq("id", data.user?.id)
        .single();

      // More specific error handling
      if (userError) {
        console.error("User data fetch error:", userError);
        if (userError.code === 'PGRST116') {
          // No rows returned - user doesn't exist in users table
          console.warn("⚠️ User profile not found - running debug check...");
          await debugUserProfile(data.user?.id || "");
          throw new Error("User profile not found. Please contact support.");
        }
        throw new Error("Error retrieving user information");
      }

      if (!userData) {
        throw new Error("User profile not found. Please contact support.");
      }

      // Redirect based on role
      if (userData.role === "teacher") {
        if (!userData.approved) {
          window.location.href = "/Auth/register/teacher/pending";
        } else {
          window.location.href = "/platforms/teacher";
        }
      } else if (userData.role === "student") {
        window.location.href = "/platforms/student";
      } else if (userData.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
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
        <Link href="/Auth/register" className={sharedStyles.link}>
          Don&apos;t have an account? Register here
        </Link>
      </div>
    </form>
  );
};
