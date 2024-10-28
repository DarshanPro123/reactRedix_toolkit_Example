import React from "react";
import { useFormContext } from "react-hook-form";

const GenderInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="text-gray-800 text-xl">
        Gender<span className="text-red-500">*</span>
      </label>
      <div className="flex h-14 gap-6 bg-gray-700 p-2 rounded-lg w-full">
        <label htmlFor="field-male" className="flex text-xl items-center">
          <input
            {...register("gender", { required: "Gender is required" })}
            type="radio"
            value="male"
            id="field-male"
            className="mr-3"
          />
          Male
        </label>

        <label htmlFor="field-female" className="flex text-xl items-center">
          <input
            {...register("gender", { required: "Gender is required" })}
            type="radio"
            value="female"
            id="field-female"
            className="mr-3"
          />
          Female
        </label>
      </div>
      {errors.gender && (
        <span className="text-red-500">{errors.gender.message}</span>
      )}
    </div>
  );
};

export default GenderInput;
