import React from "react";
import { useSelector } from "react-redux";
import { selectEntries } from "../apps/store";
import UserCard from "./UserCard.jsx";

const loginedUsers = () => {
  const entries = useSelector(selectEntries);

  return (
    <div className="mt-10 w-11/12 md:w-6/12 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl text-center mb-4">User Data</h2>
      {entries.length > 0 ? (
        entries.map((entry, index) => <UserCard key={index} entry={entry} />)
      ) : (
        <p className="text-gray-400 text-center">No entries submitted.</p>
      )}
    </div>
  );
};

export default loginedUsers;
