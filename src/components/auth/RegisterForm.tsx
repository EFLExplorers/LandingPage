import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import styles from "@/styles/Auth.module.css";

export default function RegisterForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState<"student" | "teacher" | "">(
    ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!accountType) {
      setError("⚠️ Please select an account type (Student or Teacher)");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (accountType === "student") {
      await supabase
        .from("students")
        .insert([
          { id: data.user?.id, name, email, subscription_status: "inactive" },
        ]);
    } else {
      await supabase
        .from("teachers")
        .insert([{ id: data.user?.id, name, email, approved: false }]);
    }

    setSuccess("✅ Registration successful! Check your email.");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>
            <input
              type="radio"
              name="accountType"
              value="student"
              checked={accountType === "student"}
              onChange={() => setAccountType("student")}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="teacher"
              checked={accountType === "teacher"}
              onChange={() => setAccountType("teacher")}
            />
            Teacher
          </label>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button onClick={closeModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
