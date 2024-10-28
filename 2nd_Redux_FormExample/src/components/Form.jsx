import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import DatePicker from "react-datepicker";
import { setFormData } from "../apps/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputPart from "./InputPart";

const Form = () => {
  const methods = useForm();

  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleData = (data) => {
    dispatch(
      setFormData({
        ...data,
        birthDate: data.birthDate ? data.birthDate.toISOString() : null,
      })
    );
    methods.reset({
      name: "",
      email: "",
      password: "",
      birthDate: null,
      gender: "",
    });
    setShowPassword(false);
    setDate(null);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (date) => {
    setDate(date);
    setValue("birthDate", date);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleData)}
        className="flex w-11/12 md:w-6/12 min-[340px]:p-3,text-center gap-8 flex-col  shadow-xl p-10 rounded-lg "
      >
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
          User Registration Form
        </h1>
        <InputPart
          name="name"
          type="text"
          label="Name *"
          minLength={3}
          maxLength={20}
          lableClass={"text-gray-800 text-xl"}
          inputClass={"p-2 h-14 bg-gray-700 rounded-lg"}
          placeholder="Enter Name"
        />
        <InputPart
          name="email"
          type="email"
          label="Email *"
          maxLength={30}
          lableClass={"text-gray-800 text-xl"}
          inputClass={"p-2 h-14 bg-gray-700 rounded-lg"}
          placeholder="Enter Email"
        />

        <div
          className="
        relative flex justify-between items-center
        "
        >
          <InputPart
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password *"
            minLength={6}
            maxLength={15}
            lableClass={"text-gray-800 text-xl"}
            inputClass={"p-2 h-14 bg-gray-700 rounded-lg"}
            placeholder="Enter Password"
          />

          <span
            toggle="#password-field"
            className="field-icon text-3xl text-gray-800 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label className="text-gray-800 text-xl" htmlFor="date">
          Select Date Of Birth:
        </label>

        <input
          type="submit"
          value="Submit"
          className="w-full border h-14 border-gray-700 bg-orange-400 hover:bg-orange-700 cursor-pointer text-gray-50 px-4 py-2 rounded-xl transition duration-200"
        />
      </form>
    </FormProvider>
  );
};

export default Form;

{
  /* <div className="relative">
          <DatePicker
            {...register("birthDate", {
              required: "Birth date is required",
            })}
            selected={date}
            startDate={new Date("1900-01-01")}
            onChange={handleChange}
            className={`p-2 h-14 bg-gray-700 rounded-lg ${
              errors.birthDate ? "border border-red-500" : ""
            }`}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a birth date"
          />
          {errors.birthDate && (
            <span className="text-red-500">{errors.birthDate.message}</span>
          )}
        </div> */
}

{
  /* <label className="text-gray-800 text-xl" htmlFor="">
          Gendar:
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
              {...register("gender")}
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
        )} */
}

{
  /* {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )} */
}
