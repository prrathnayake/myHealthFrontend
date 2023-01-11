import React, { useContext, useEffect, useState } from "react";
import "./add_available_time_screen.css";
import NavBar from "../../components/navBar/navBar";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AddAvailableTimeScreen() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(dayjs("2018-01-01T00:00:00.000Z"));
  const [endTime, setEndTime] = useState(dayjs("2018-01-01T00:00:00.000Z"));
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [day, setDay] = useState("");
  const { role } = useContext(roleContext);

  const [doctorList, setDoctorList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
    if (role !== 1) {
      navigate(`/`);
    }
    getHospitalList();
    getDoctorList();
  // eslint-disable-next-line no-use-before-define
  }, [navigate, role, validate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const getDoctorList = async () => {
    await axios({
      method: "GET",
      url: `${apiEndpoint}doctors/dropdown`,
    })
      .then((res) => {
        setDoctorList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getHospitalList = async () => {
    await axios({
      method: "GET",
      url: `${apiEndpoint}hospitals/dropdown`,
    })
      .then((res) => {
        setHospitalList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleStartTime = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTime = (newValue) => {
    setEndTime(newValue);
  };

  const register = async () => {
    await axios({
      method: "POST",
      url: `${apiEndpoint}addAvailableTime`,
      data: {
        doctorID: doctor,
        hospitalID: hospital,
        dayOfWeek: day,
        startTime: startTime.format("HH:mm:ss"),
        endTime: endTime.format("HH:mm:ss"),
      },
    }).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">Add Available Time</h1>
        <form className="add-staff-screen-form">
          <div className="add-staff-screen-input-div">
            <label className="label" name="role">
              Doctor
            </label>
            <select
              id="doctor"
              name="doctor"
              className="add-staff-screen-dropdown"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="" />
              {doctorList.map((doctor) => (
                <option value={doctor["staffID"]}>
                  Dr. {doctor["firstName"]} {doctor["lastName"]}
                </option>
              ))}
            </select>
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="email">
              Hospital
            </label>
            <select
              id="hospital"
              name="hospital"
              className="add-staff-screen-dropdown"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            >
              <option value="" />
              {hospitalList.map((hospital) => (
                <option value={hospital["hospitalID"]}>
                  {hospital["name"]}
                </option>
              ))}
            </select>
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="email">
              Day of Week
            </label>
            <select
              id="day"
              name="day"
              className="add-staff-screen-dropdown"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="" />
              {dayOfWeek.map((day) => (
                <option value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="add-staff-screen-input-div">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={handleStartTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="add-staff-screen-input-div">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={handleEndTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <button
            className="add-staff-screen-form-button"
            type="button"
            onClick={register}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
