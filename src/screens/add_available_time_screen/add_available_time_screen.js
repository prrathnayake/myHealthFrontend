import React, { useState } from "react";
import "./add_available_time_screen.css";
import NavBar from "../../components/navBar/navBar";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function AddAvailableTimeScreen() {
  const [startTime, setStartTime] = useState(dayjs("2018-01-01T00:00:00.000Z"));
  const [endTime, setEndTime] = useState(dayjs("2018-01-01T00:00:00.000Z"));
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [day, setDay] = useState("");

  const doctorList = ["Dr.Pasan", "Dr.Perera"];
  const hospitalList = [
    "Sr i Jayawardanapura",
    "Radiologist",
    "Family physicians",
  ];
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleStartTime = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTime = (newValue) => {
    setEndTime(newValue);
  };

  const register = () => {};
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
                <option value={doctor}>{doctor}</option>
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
                <option value={hospital}>{hospital}</option>
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
            type="submit"
            onClick={register}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
