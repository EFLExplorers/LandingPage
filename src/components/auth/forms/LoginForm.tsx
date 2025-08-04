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
import { debugSupabaseConnection } from "../../../utils/debugSupabaseConnection";
import { debugAuth } from "../../../utils/debugAuth";
import { AUTH_PATHS, PLATFORM_PATHS, redirectToPlatform } from "../../../constants/paths";

interface LoginFormProps {
  platform?: UserPlatform;
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
      // Debug Supabase connection first
      console.log("🔍 Debugging Supabase connection before login...");
      debugSupabaseConnection();

      // Debug authentication with detailed error handling
      console.log("🔐 Starting authentication process...");
      const authResult = await debugAuth(formData.email, formData.password);
      
      if (!authResult.success) {
        // Handle specific authentication errors
        const errorMessage = (authResult.error as any)?.message || "Authentication failed";
        
        if (errorMessage.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials and try again.");
        } else if (errorMessage.includes("Email not confirmed")) {
          setError("Please check your email and confirm your account before logging in.");
        } else if (errorMessage.includes("Too many requests")) {
          setError("Too many login attempts. Please wait a few minutes before trying again.");
        } else {
          setError(`Login failed: ${errorMessage}`);
        }
        
        setLoading(false);
        return;
      }

      const { data } = authResult;
      
      if (!data || !data.user) {
        setError("Authentication failed. Please try again.");
        setLoading(false);
        return;
      }

      // Fetch user role and approval status
      console.log("🔍 Fetching user profile for ID:", data.user.id);
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("role, status")
        .eq("id", data.user.id)
        .single();

      // More specific error handling
      if (userError) {
        console.error("User data fetch error:", userError);
        if (userError.code === 'PGRST116') {
          // No rows returned - user doesn't exist in profiles table
          console.warn("⚠️ User profile not found - running debug check...");
          await debugUserProfile(data.user.id);
          setError("User profile not found. Please contact support.");
        } else {
          setError("Error retrieving user information. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (!userData) {
        setError("User profile not found. Please contact support.");
        setLoading(false);
        return;
      }

      // Validate platform if specified
      if (platform && userData.role !== platform) {
        setError(`This account is registered as a ${userData.role}, not a ${platform}`);
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (userData.role === "teacher") {
        redirectToPlatform.teacher(userData.status);
      } else if (userData.role === "student") {
        redirectToPlatform.student();
      } else if (userData.role === "admin") {
        redirectToPlatform.admin();
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("❌ Unexpected error during login:", error);
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
        <Link href={AUTH_PATHS.forgotPassword} className={sharedStyles.link}>
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
        <Link href={AUTH_PATHS.register} className={sharedStyles.link}>
          Don&apos;t have an account? Register here
        </Link>
      </div>
    </form>
  );
};
