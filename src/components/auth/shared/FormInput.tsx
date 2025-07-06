import { FormInputProps } from "../types/auth.types";
import formStyles from "../styles/AuthForm.module.css";

export const FormInput = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
}: FormInputProps) => {
  return (
    <div className={formStyles.formGroup}>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${formStyles.input} ${error ? formStyles.inputError : ""}`}
        required={required}
        disabled={disabled}
      />
      {error && <span className={formStyles.errorText}>{error}</span>}
    </div>
  );
};
