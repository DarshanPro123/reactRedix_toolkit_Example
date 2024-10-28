import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { setFormData } from "../apps/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputPart from "./InputPart";
import GenderInput from "./GenderInput";

const Form = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleData = (data) => {
    dispatch(
      setFormData({
        ...data,
        id: Date.now(),
        birthDate: data.birthDate ? data.birthDate.toISOString() : null,
      })
    );
    methods.reset();
    setShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleData)}
        className="flex w-11/12 md:w-6/12 min-[340px]:p-3  gap-8 flex-col shadow-md hover:shadow-lg p-10 rounded-lg"
      >
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
          User Registration Form
        </h1>
        <InputPart
          name="name"
          type="text"
          label="Name"
          minLength={3}
          maxLength={20}
          lableClass={"text-gray-800 text-xl"}
          inputClass={"p-2 h-14 bg-gray-700 rounded-md"}
          placeholder="Enter Name"
        />
        <InputPart
          name="email"
          type="email"
          label="Email"
          maxLength={30}
          inputClass={"p-2 h-14 bg-gray-700 rounded-sm"}
          placeholder="Enter Email"
        />
        <div className="relative  flex  items-center">
          <div className="flex-grow">
            <InputPart
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              minLength={6}
              maxLength={15}
              inputClass={"p-2 w-full mr-2 h-14 bg-gray-700 rounded-sm"}
              placeholder="Enter Password"
            />
          </div>
          <span
            className="field-icon text-3xl  text-gray-800 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label className="text-gray-800 text-xl">Select Date Of Birth:</label>
        <Controller
          name="birthDate"
          control={methods.control}
          defaultValue={null}
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
              onBlur={onBlur}
              maxDate={new Date()}
              className="p-2 h-14 bg-gray-700 rounded-sm"
              dateFormat="dd/MMMM/yyyy"
              placeholderText="Select a birth date"
              isClearable
              // inline
              showYearDropdown
              showMonthDropdown
              scrollableMonthYearDropdown
              monthDropDownItemNumber={12}
              yearDropdownItemNumber={30}
              scrollableYearDropdown
            />
          )}
        />
        {methods.formState.errors.birthDate && (
          <span className="text-red-500">
            {methods.formState.errors.birthDate.message}
          </span>
        )}{" "}
        <GenderInput />
        <input
          type="submit"
          value="Submit"
          className="w-full border
           h-14 border-gray-700
            bg-orange-400 hover:bg-orange-700
             cursor-pointer text-gray-50 px-4 py-2 
             rounded-xl transition duration-200"
        />
      </form>
    </FormProvider>
  );
};

export default Form;
