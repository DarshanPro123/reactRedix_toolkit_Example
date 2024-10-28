import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEntries, deleteData } from "../apps/store"; // Make sure to import deleteData
import UserCard from "./UserCard.jsx";

const LoginedUsers = () => {
  const entries = useSelector(selectEntries);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  return (
    <div className="mt-10 w-11/12 md:w-6/12 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl text-center mb-4">User Data</h2>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <UserCard
            handleDelete={() => handleDelete(entry.id)} // Correctly passes delete handler
            key={entry.id} // Use unique key
            entry={entry}
          />
        ))
      ) : (
        <p className="text-gray-400 text-center">No entries submitted.</p>
      )}
    </div>
  );
};

export default LoginedUsers;
