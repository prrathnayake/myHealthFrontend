import React from "react";
import "./appointment card.css";
import dayjs from "dayjs";
import axios from "axios";
import apiEndpoint from "../../../utils/api";
import { useNavigate } from "react-router";

export default function AppointmentCard(prop) {
  const navigate = useNavigate();

  const cancle = async () => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    await axios({
      method: "POST",
      url: `${apiEndpoint}schedules/cancle?id=${prop.scedule["scheduleID"]}`,
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
    prop.setIsReload(!prop.isReload);
  };

  const confirm = async () => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    await axios({
      method: "POST",
      url: `${apiEndpoint}schedules/confirm?id=${prop.scedule["scheduleID"]}`,
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
    prop.setIsReload(!prop.isReload);
  };
  return (
    <>
      {" "}
      <div className="appointment-card">
        <div className="patient-name">
          Name - {prop.scedule["firstName"]} {prop.scedule["lastName"]}
        </div>
        <div className="appoinrment-date">
          <p>Date - </p>{" "}
          <p>{dayjs(prop.scedule["scheduledDate"]).format("YYYY/mm/DD")}</p>
        </div>
        <div className="appoinrment-times">
          <div className="appoinrment-startTime">
            <p>Start Time - </p> <p>{prop.scedule["startTime"]}</p>
          </div>
          <div className="appoinrment-endTime">
            <p>End Time - </p> <p>{prop.scedule["endTime"]}</p>
          </div>
          <div className="appoinrment-endTime">
            <p>Status - </p> <p>{prop.scedule["status"]}</p>
          </div>
        </div>
        <div>
          <button onClick={confirm}>Confirm</button>
          <button onClick={cancle}>Cancle</button>
        </div>
      </div>
    </>
  );
}
