import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddAreaScreen() {
  const navigate = useNavigate();
  const {role} = useContext( roleContext );
  const [area, setArea] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if(area === '') return setErr("please fill all");
    await axios({
      method: 'POST',
      url: `${apiEndpoint}area`,
      data: {
        area: area.toLowerCase()
      }
    }).catch(function (error) {
      console.log(error);
    });
    setArea("");
  };

  const validate = async(accessToken) => {await axios({
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
    });}

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if(accessToken === null) return navigate("/login");
    validate(accessToken);
    if(role !== 1){
      navigate(`/`);
    }
  });

  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New Area</h1>
        <form className="add-staff-screen-form">
          <div className="add-staff-screen-input-div">
            <label className="label" name="role">
              New Role
            </label>
            <input
              placeholder="area"
              type="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
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
        </form>
      </div>
    </>
  );
}
