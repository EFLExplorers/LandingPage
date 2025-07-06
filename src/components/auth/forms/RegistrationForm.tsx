import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../utils/supabaseClient";
import { FormInput } from "../shared/FormInput";
import { UserPlatform, AuthFormData } from "../types/auth.types";
import { validateRegistration } from "../utils/authValidation";
import formStyles from "../styles/AuthForm.module.css";
import componentStyles from "../styles/AuthForm.module.css";

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
      // Registration logic here...
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.authForm}>
      {error && <div className={formStyles.error}>{error}</div>}

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

      <FormInput
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <FormInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword || ""}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <button
        type="submit"
        className={componentStyles.button}
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className={componentStyles.links}>
        <Link href="/auth/login">Already have an account? Login here</Link>
      </div>
    </form>
  );
};
