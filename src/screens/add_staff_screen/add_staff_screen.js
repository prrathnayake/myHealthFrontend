import React, { useState } from "react";
import "./add_staff_screen.css";
import NavBar from "../../components/navBar/navBar";

export default function AddStaffScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMoble] = useState("");
  const [role, setRole] = useState("");
  const [area, setArea] = useState("");

  const roleList = ["Doctor", "Admin"];
  const areaList = ["Neurologist", "Radiologist", "Family physicians"];

  const register = () => {};
  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New staff member</h1>
        <form className="add-staff-screen-form">
          <div className="add-staff-screen-input-div">
            <label className="label" name="firstName">
              First Name
            </label>
            <input
              placeholder="Enter your First Name"
              type="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="lastName">
              Last Name
            </label>
            <input
              placeholder="Enter your LastName"
              type="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="email">
              Area
            </label>
            <select
              id="area"
              name="area"
              className="add-staff-screen-dropdown"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="" />
              {areaList.map((area) => (
                <option value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="email">
              Email
            </label>
            <input
              placeholder="Enter your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="add-staff-screen-input-div">
            <label className="label" name="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="add-staff-screen-dropdown"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" />
              {roleList.map((role) => (
                <option value={role}>{role}</option>
              ))}
            </select>
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
