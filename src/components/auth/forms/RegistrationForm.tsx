import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../utils/supabaseClient";
import { FormInput } from "../shared/FormInput";
import { PasswordInput } from "../shared/PasswordInput";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { UserPlatform, AuthFormData } from "../types/auth.types";
import { validateRegistration } from "../utils/authValidation";
import sharedStyles from "../styles/shared.module.css";

interface RegistrationFormProps {
  platform: UserPlatform;
}

export const RegistrationForm = ({ platform }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validate form data
    const validationError = validateRegistration(formData);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: platform,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile in the users table
        const { error: profileError } = await supabase
          .from("users")
          .insert([
            {
              id: authData.user.id,
              email: formData.email,
              first_name: formData.firstName,
              last_name: formData.lastName,
              role: platform,
              approved: platform === "student" ? true : false, // Students are auto-approved, teachers need approval
            },
          ]);

        if (profileError) throw profileError;

        // Handle successful registration
        if (platform === "teacher") {
          // Redirect to pending approval page for teachers
          window.location.href = "/Auth/register/teacher/pending";
        } else {
          // Auto-login for students and redirect to student platform
          const platformUrl = process.env.NEXT_PUBLIC_STUDENT_URL;
          window.location.href = `${platformUrl}/dashboard`;
        }
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
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        value={formData.firstName || ""}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <FormInput
        id="lastName"
        name="lastName"
        type="text"
        label="Last Name"
        value={formData.lastName || ""}
        onChange={handleChange}
        required
        disabled={loading}
      />

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
        showStrength={true}
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword || ""}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <button
        type="submit"
        className={sharedStyles.button}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" color="white" />
            <span>Creating Account...</span>
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <div className={sharedStyles.links}>
        <Link href="/Auth/login" className={sharedStyles.link}>
          Already have an account? Login here
        </Link>
      </div>
    </form>
  );
};
