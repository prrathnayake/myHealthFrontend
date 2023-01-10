import React from "react";
import './appointment card.css';

export default function AppointmentCard(prop) {

  return (
    <div className="appointment-card">
      <div className="patient-name">Name - {prop.scedule['firstName']} {prop.scedule['lastName']}</div>
      <div className="appoinrment-date">
        <p>Date - </p> <p>{prop.scedule['scheduledDate']}</p>
      </div>
      <div className="appoinrment-times">
        <div className="appoinrment-startTime">
          <p>Start Time - </p> <p>{prop.scedule['startTime']}</p>
        </div>
        <div className="appoinrment-endTime">
          <p>End Time - </p> <p>{prop.scedule['endTime']}</p>
        </div>
      </div>
    </div>
  );
}
