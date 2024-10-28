import React from "react";
import { useFormContext } from "react-hook-form";

const InputPart = ({
  name,
  type = "text",
  label,
  placeholder,
  lableClass,
  inputClass,
  minLength,
  maxLength,
  important,
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
        })}
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${inputClass} ${
          errors[name] ? "border border-red-500" : ""
        }`}
      />
      {errors[name] && (
        <span className="text-red-500">{errors[name]?.message}</span>
      )}
    </>
  );
};

export default InputPart;
