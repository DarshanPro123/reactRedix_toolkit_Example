import React from "react";
import axios from "axios";

const UserPage = () => {
  const [data, setData] = React.useState([]);
  const url = "https://run.mocky.io/v3/7c8989c3-638d-4709-975f-dccbc6e808bb";

  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative text-gray-800 p-5">
      <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
        User Data{" "}
      </h1>
      <p className="text-red-500 absolute text-2xl font-bold right-2 top-6 ">
        users found 🚀 :{data.length}
      </p>

      <div className="flex justify-center flex-wrap gap-6">
        {data.map((user) => (
          <div
            key={user.employee_id}
            className="border border-gray-300 shadow-lg p-6 rounded-lg w-full max-w-sm bg-white transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              {user.first_name} {user.last_name}
            </h2>
            <span className="absolute top-3 right-3 text-red-500">
              Manager ID: {user.manager_id}
            </span>
            <p className="mb-2">
              <span className="font-bold">Email: </span>
              {user.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Age: </span>
              {user.age}
            </p>
            <p className="mb-2">
              <span className="font-bold">Hiring Date: </span>
              {user.hire_date}
            </p>
            <p className="mb-2">
              <span className="font-bold text-red-500">Department: </span>
              {user.department}
            </p>
            <p className="mb-2">
              <span className="font-bold">City: </span>
              {user.location}
            </p>
            <p className="mb-2">
              <span className="font-bold">Salary: </span>$
              {Math.floor(user.salary)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
