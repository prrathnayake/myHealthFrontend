import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddRoleScreen() {
  const navigate = useNavigate();
  const {role} = useContext( roleContext );
  const [doctorRole, setDoctorRole] = useState("");

  const submit = async () => {
    window.location.reload(false);
    await axios({
      method: 'POST',
      url: `${apiEndpoint}role`,
      data: {
        role: role.toLowerCase()
      }
    }).catch(function (error) {
      console.log(error);
    });
    setDoctorRole("");
  };

  useEffect(() => {
    if(role !== 1){
      navigate(`/`);
    }
  });
  
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
              value={doctorRole}
              onChange={(e) => setDoctorRole(e.target.value)}
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
