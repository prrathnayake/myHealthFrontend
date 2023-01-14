import React, { useContext, useEffect, useState } from "react";
import "./add_hospital_screen.css";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddHospitalScreen() {
  const navigate = useNavigate();
  const { role } = useContext(roleContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMoble] = useState("");
  const [err, setErr] = useState("");

  const register = async () => {
    if (name === "" || address === "" || mobile === "") {
      return setErr("please fill all");
    }
    await axios({
      method: "POST",
      url: `${apiEndpoint}hospitals/addHospital`,
      data: {
        name: name,
        address: address,
        mobile: mobile,
      },
    }).catch(function (error) {
      console.log(error);
    });

    setName("");
    setAddress("");
    setMoble("");
  };

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

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
    if (role !== 1) {
      navigate(`/`);
    }
  });
  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New Hospital</h1>
        <form className="add-staff-screen-form">
          <div className="add-staff-screen-input-div">
            <label className="label" name="name">
              Name
            </label>
            <input
              placeholder=" Name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="address">
              Address
            </label>
            <input
              placeholder="Address"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="add-staff-screen-input-div">
            <label className="label" name="mobile">
              Mobile
            </label>
            <input
              placeholder="Enter your Mobile"
              type="mobile"
              value={mobile}
              onChange={(e) => setMoble(e.target.value)}
              required
            />
          </div>

          <button
            className="add-staff-screen-form-button"
            type="submit"
            onClick={register}
          >
            LogIn
          </button>
          {err === "" ? null : <p>{err}</p>}
        </form>
      </div>
    </>
  );
}
