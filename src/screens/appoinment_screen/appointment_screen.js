import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./appointment_screen.css";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import AppointmentCard from "./components/appintment_card";
import axios from "axios";
import apiEndpoint from "../../utils/api";

export default function AppointmentScreen() {
  const [date, setDate] = React.useState(dayjs("2022-04-07"));
  const [scheduleList, setScheduleList] = useState([]);

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  const getSchedules = async () => {

    await axios({
      method: "GET",
      url: `${apiEndpoint}schedules/doctorId?id=2`,
    })
      .then((res) => {
        setScheduleList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSchedules();
  }, [date]);
  
  return (
    <>
      <NavBar />
      <div className="appointment-screen-body">
        <div className="date-picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="portrait"
              openTo="day"
              value={date}
              shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="appointment-bar">
          <h1>Appointments</h1>
          {scheduleList.map((schedule) => (
            <AppointmentCard scedule={schedule}/>
          ))}
        </div>
      </div>
    </>
  );
}
