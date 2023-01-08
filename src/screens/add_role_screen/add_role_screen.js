import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";

export default function AddRoleScreen() {
  const [role, setRole] = useState("");

  const submit = () => {};
  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New Role</h1>
        <form className="add-staff-screen-form">
          <div className="add-staff-screen-input-div">
            <label className="label" name="role">
              New Role
            </label>
            <input
              placeholder="role"
              type="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <button
            className="add-staff-screen-form-button"
            type="submit"
            onClick={submit}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}
