import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";
import { toast } from "react-toastify";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
    toast.success("Customer created successfully");
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="inputs"
      >
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            placeholder="National ID"
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </form>
    </div>
  );
}

export default Customer;
