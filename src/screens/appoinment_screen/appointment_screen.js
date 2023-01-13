import React, { useContext, useEffect, useState } from "react";
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
import { roleContext } from "../../resources/contexts/role.js";
import { useNavigate } from "react-router";

export default function AppointmentScreen() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(dayjs(Date.now() + ( 3600 * 1000 * 24)));
  const [scheduleList, setScheduleList] = useState([]);
  const {role} = useContext( roleContext );

  // const isWeekend = (date) => {
  //   const day = date.day();
  //   return day === 0 || day === 6;
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSchedules = async () => {
    await axios({
      method: "GET",
      url: `${apiEndpoint}schedules/doctorId?id=2&date=${date.format('YYYY-MM-DD')}`
    })
      .then((res) => {
        setScheduleList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken === null) return navigate("/login");
    validate(accessToken);
    if(role !== 1){
      navigate(`/`);
    }
    getSchedules();
  },[role]);


  
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
              // shouldDisableDate={isWeekend}
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
