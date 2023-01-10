import React from "react";
import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return navigate("/login");
  };
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
          <Link className="text-link" to="/">
            MY PATIENTS
          </Link>
        </li>
        <li>
          <Link className="text-link" to="/">
            PROFILE
          </Link>
        </li>
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
            </div>
          </div>
        </li>
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
