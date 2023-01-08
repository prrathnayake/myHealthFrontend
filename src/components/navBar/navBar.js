import React from "react";
import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    return navigate('/login')
  }
  const showDropdown = () => {}
  return (
    <div className="Navbar">
      <img src={require("../../resources/Images/logo.png")} alt="Logo" />
      <ul className="list-item">
        <li><Link className='text-link' to='/'>HOME</Link></li>
        <li><Link className='text-link' to='/appointments'>APPOINTMENTS</Link></li>
        <li><Link className='text-link' to='/'>MY PATIENTS</Link></li>
        <li><Link className='text-link' to='/'>PROFILE</Link></li>
        <li onClick={showDropdown}><Link className='text-link admin' to='/addStaff'>ADMINISTRATION</Link></li>
        
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
