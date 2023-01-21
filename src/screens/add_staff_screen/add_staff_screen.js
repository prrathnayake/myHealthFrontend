import React, { useContext, useEffect, useState } from "react";
import "./add_staff_screen.css";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddStaffScreen() {
  const navigate = useNavigate();
  const { role } = useContext(roleContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMoble] = useState("");
  const [doctorRole, setDoctorRole] = useState("");
  const [area, setArea] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [isShowArea, setIsShowArea] = useState(false);

  const [err, setErr] = useState("");

  useEffect(() => {
    if (doctorRole === "2") {
      setIsShowArea(true);
    } else {
      setIsShowArea(false);
    }
  }, [doctorRole]);

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
    const checkAccess = () => {
      const accessToken = JSON.parse(localStorage.getItem("token"));

      if (accessToken === null) return navigate("/login");
      validate(accessToken);
      if (role !== 1) {
        navigate(`/`);
      }
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
          if (res.data === "not authenticated") {
            navigate(`/login`);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    checkAccess();
    getRoleList();
    getAreaList();
  }, [navigate, role]);

  const register = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      role === "" ||
      doctorRole === "" ||
      mobile === "" ||
      email === ""
    ) {
      return setErr("please fill all");
    }
    if (role === "" && area === "") {
      return setErr("please fill all");
    }
    var regexEmail =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(email)) {
      setErr("please enter a valid email");
    }

    var regexMobile =
    /^(?:\+\d{1,3}|0\d{1,3}|\d{1,4})?(?:\s?\d{3,4}){2}$/
    ;
    if (!regexMobile.test(mobile)) {
      setErr("please enter a valid mobile");
    }

    const accessToken = JSON.parse(localStorage.getItem("token"));
    await axios({
      method: "POST",
      url: `${apiEndpoint}staffs/addStaff`,
      data: {
        firstName: firstName,
        lastName: lastName,
        area: area,
        role: doctorRole,
        mobile: mobile,
        email: email,
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

    setFirstName("");
    setLastName("");
    setEmail("");
    setMoble("");
    setErr("");
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
                <option key={role["roleID"]} value={role["roleID"]}>
                  {role["discription"]}
                </option>
              ))}
            </select>
          </div>
          {isShowArea ? (
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
                  <option key={area["areaID"]} value={area["areaID"]}>
                    {area["discription"]}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <button
            className="add-staff-screen-form-button"
            type="button"
            onClick={register}
          >
            Submit
          </button>
          {err === "" ? null : <p>{err}</p>}
        </form>
      </div>
    </>
  );
}
