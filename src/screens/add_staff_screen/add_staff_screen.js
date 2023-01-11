import React, { useContext, useEffect, useState } from "react";
import "./add_staff_screen.css";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddStaffScreen() {
  const navigate = useNavigate();
  const {role} = useContext( roleContext );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMoble] = useState("");
  const [doctorRole, setDoctorRole] = useState("");
  const [area, setArea] = useState("");

  const [roleList, setRoleList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const getRoleList = async () => {
    await axios({
      method: "GET",
      url: `${apiEndpoint}role`,
    })
      .then((res) => {
        setRoleList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAreaList = async () => {
    await axios({
      method: "GET",
      url: `${apiEndpoint}area`,
    })
      .then((res) => {
        setAreaList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if(role !== 1){
      navigate(`/`);
    }
    getRoleList();
    getAreaList();
  }, []);

  const register = async () => {
    await axios({
      method: "POST",
      url: `${apiEndpoint}staffs/addStaff`,
      data: {
        firstName: firstName,
        lastName: lastName,
        area: area,
        role: role,
        mobile: mobile,
        email: email,
      },
    }).catch(function (error) {
      console.log(error);
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setMoble("");
    
  };
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
                <option value={area["areaID"]}>{area["discription"]}</option>
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
              value={doctorRole}
              onChange={(e) => setDoctorRole(e.target.value)}
            >
              <option value="" />
              {roleList.map((role) => (
                <option value={role["roleID"]}>{role["discription"]}</option>
              ))}
            </select>
          </div>
          <button
            className="add-staff-screen-form-button"
            type="button"
            onClick={register}
          >
            LogIn
          </button>
        </form>
      </div>
    </>
  );
}
