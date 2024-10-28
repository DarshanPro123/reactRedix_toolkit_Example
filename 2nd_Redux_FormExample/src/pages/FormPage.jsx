import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form.jsx";
import { selectEntries } from "../apps/store";
import LoginedUsers from "../components/loginedUsers.jsx";

const FormPage = () => {
  return (
    <div className="flex flex-col items-center  text-gray-50">
      <Form />
      {/* Display All Submitted Data */}
      <LoginedUsers />
    </div>
  );
};

export default FormPage;
