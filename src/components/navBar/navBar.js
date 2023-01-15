import React, { useContext } from "react";
import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";
import { roleContext } from "../../resources/contexts/role.js";

export default function NavBar() {
  const navigate = useNavigate();
  const { role, setRole } = useContext(roleContext);

  const logout = () => {
    localStorage.removeItem("token");
    setRole(0);
    return navigate("/login");
  };
  console.log(role);
  return (
    <div className="Navbar">
      <img src={require("../../resources/Images/logo.png")} alt="Logo" />
      <ul className="list-item">
        <li>
          <Link className="text-link" to="/">
            HOME
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/appointments">
            APPOINTMENTS
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/patients">
            MY PATIENTS
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/chats">
            CHATS
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/profile">
            PROFILE
          </Link>
        </li>
        <li>
          <div className="main-nav">
            <p>PRESCRIPTIONS</p>
            <div className="sub-nav">
              <Link className="text-link sub-link" to="/createPrescription">
                CREATE PRESCRIPTION
              </Link>
              <Link className="text-link sub-link" to="/sendPrescription">
                SEND PRESCRIPTION
              </Link>
            </div>
          </div>
        </li>
        {role === 1 ? (
          <li>
            <div className="main-nav">
              <p>ADMINISTRATION</p>
              <div className="sub-nav">
                <Link className="text-link sub-link" to="/addStaff">
                  ADD STAFF
                </Link>
                <Link className="text-link sub-link" to="/addRole">
                  ADD ROLE
                </Link>
                <Link className="text-link sub-link" to="/addArea">
                  ADD AREA
                </Link>
                <Link className="text-link sub-link" to="/addAvailableTime">
                  ADD AVAILABLE TIME
                </Link>
                <Link className="text-link sub-link" to="/addHospital">
                  ADD HOSPITAL
                </Link>
              </div>
            </div>
          </li>
        ) : null}
      </ul>
      {!localStorage.getItem("token") ? (
        <button className="login-btn">LOGIN</button>
      ) : (
        <button onClick={logout} className="login-btn">
          LOGOUT
        </button>
      )}
    </div>
  );
}
