import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";

export default function AddRoleScreen() {
  const [role, setRole] = useState("");

  const submit = async () => {
    window.location.reload(false);
    await axios({
      method: 'POST',
      url: 'http://localhost:3001/role',
      data: {
        role: role.toLowerCase()
      }
    }).catch(function (error) {
      console.log(error);
    });
    setRole("");
  };
  
  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New Role</h1>
        <div className="add-staff-screen-form" >
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
            type="button"
            onClick={submit}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
