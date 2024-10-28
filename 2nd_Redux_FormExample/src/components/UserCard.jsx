import React from "react";

const UserCard = ({ entry, handleDelete }) => {
  return (
    <div className="relative text-gray-200 mb-4 border-b border-gray-500 py-2">
      <span className="absolute right-0 cursor-pointer" onClick={handleDelete}>
        ❌
      </span>
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
        {entry.birthDate ? new Date(entry.birthDate).toLocaleDateString() : ""}
      </p>
      <p>
        <strong>Gender:</strong> {entry.gender}
      </p>
    </div>
  );
};

export default UserCard;
