import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddRoleScreen() {
  const navigate = useNavigate();
  const { role } = useContext(roleContext);
  const [doctorRole, setDoctorRole] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if(doctorRole === '') return setErr("please fill all");
    await axios({
      method: "POST",
      url: `${apiEndpoint}role`,
      data: {
        role: doctorRole.toLowerCase(),
      },
    }).catch(function (error) {
      console.log(error);
    });
    setDoctorRole("");
    setErr("");
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
    if (role !== 1) {
      navigate(`/`);
    }
  });

  const validate = async (accessToken) => {
    await axios({
      method: "POST",
      url: `${apiEndpoint}auth/validateToken`,
      data: {
        accessToken: accessToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === "not authenticated") {
          navigate(`/login`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New Role</h1>
        <div className="add-staff-screen-form">
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
          {err === "" ? null : <p>{err}</p>}
        </div>
      </div>
    </>
  );
}
