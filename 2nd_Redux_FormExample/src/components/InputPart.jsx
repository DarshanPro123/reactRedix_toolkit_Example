import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const InputPart = ({
  name,
  type = "text",
  label,
  placeholder,
  lableClass,
  inputClass,
  minLength,
  maxLength,
  value,
  required = true, // Default to true
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label className={lableClass}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        {...register(name, {
          required: required ? `${label} is required` : false, // Apply required conditionally
          minLength: minLength && {
            value: minLength,
            message: `${label} must be at least ${minLength} characters`,
          },
          maxLength: maxLength && {
            value: maxLength,
            message: `${label} must not exceed ${maxLength} characters`,
          },
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                }
              : type === "password"
              ? {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                  message:
                    "Password must contain at least 6 characters, including UPPER/lowercase and numbers",
                }
              : undefined,
        })}
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${inputClass} ${
          errors[name] ? "border border-red-500" : ""
        }`}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <span className="text-red-500">{message}</span>
        )}
      />
    </>
  );
};

export default InputPart;
