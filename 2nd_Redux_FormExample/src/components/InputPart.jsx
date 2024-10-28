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
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label className={lableClass}>{label}</label>
      <input
        {...register(name, {
          required: `${label} is required`,
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
