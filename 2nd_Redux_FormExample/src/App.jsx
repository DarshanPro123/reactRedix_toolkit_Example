import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setFormData, selectEntries } from "./apps/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const entries = useSelector(selectEntries);
  const [date, setDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (date) => {
    setDate(date);
    setValue("birthDate", date);
  };

  const handleData = (data) => {
    dispatch(
      setFormData({
        ...data,
        birthDate: data.birthDate ? data.birthDate.toISOString() : null,
      })
    );
    reset({
      name: "",
      email: "",
      password: "",
      birthDate: null,
      gender: "",
    });
    setShowPassword(false);
    setDate(null);
  };
  return (
    <div className="flex flex-col items-center  text-gray-50">
      <form
        onSubmit={handleSubmit(handleData)}
        className="flex w-11/12 md:w-6/12 min-[340px]:p-3,text-center gap-8 flex-col  shadow-xl p-10 rounded-lg "
      >
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
          User Registration Form
        </h1>
        <label className="text-gray-800 text-xl" htmlFor="name">
          Name:
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Enter Name"
          className={`p-2 h-14 bg-gray-700 rounded-lg ${
            errors.name ? "border border-red-500" : ""
          }`}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <label className="text-gray-800 text-xl" htmlFor="email">
          Email:
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Enter Email"
          className={`p-2 h-14 bg-gray-700 rounded-lg ${
            errors.email ? "border border-red-500" : ""
          }`}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label className="text-gray-800 text-xl" htmlFor="password">
          Password:
        </label>
        <div
          className="
        relative flex justify-between items-center
        "
        >
          {" "}
          <input
            {...register("password", { required: "Password is required" })}
            type={showPassword ? "text" : "password"}
            id="password-field"
            placeholder="Enter Password"
            className={`p-2 h-14 bg-gray-700 w-5/6 rounded-lg ${
              errors.password ? "border border-red-500" : ""
            }`}
          />
          <span
            toggle="#password-field"
            className="field-icon text-3xl text-gray-800 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label className="text-gray-800 text-xl" htmlFor="date">
          Select Date Of Birth:
        </label>
        <div className="relative">
          <DatePicker
            {...register("birthDate", { required: "Birth date is required" })}
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
        </div>
        <label className="text-gray-800 text-xl" htmlFor="">
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
        )}
        <input
          type="submit"
          value="Submit"
          className="w-full border h-14 border-gray-700 bg-orange-400 hover:bg-orange-700 cursor-pointer text-gray-50 px-4 py-2 rounded-xl transition duration-200"
        />
      </form>

      {/* Display All Submitted Data */}
      <div className="mt-10 w-11/12 md:w-6/12 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl text-center mb-4">User Data</h2>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div
              key={index}
              className="text-gray-200 mb-4 border-b border-gray-500 py-2"
            >
              <p>
                <strong>Name:</strong> {entry.name}
              </p>
              <p>
                <strong>Email:</strong> {entry.email}
              </p>
              <p>
                <strong>Password:</strong> {entry.password}
              </p>
              <p>
                <strong>Birth Date:</strong>{" "}
                {entry.birthDate
                  ? new Date(entry.birthDate).toLocaleDateString()
                  : ""}
              </p>
              <p>
                <strong>Gender:</strong> {entry.gender}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No entries submitted.</p>
        )}
      </div>
    </div>
  );
}

export default App;
