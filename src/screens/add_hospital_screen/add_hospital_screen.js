import React, { useState } from "react";
import "./add_hospital_screen.css";
import NavBar from "../../components/navBar/navBar";

export default function AddHospitalScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMoble] = useState("");

  const register = () => {};
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
        </form>
      </div>
    </>
  );
}
