import React from "react";

const UserCard = ({ entry }) => {
  return (
    <div
      key={entry.name}
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
        {entry.birthDate ? new Date(entry.birthDate).toLocaleDateString() : ""}
      </p>
      <p>
        <strong>Gender:</strong> {entry.gender}
      </p>
    </div>
  );
};

export default UserCard;
