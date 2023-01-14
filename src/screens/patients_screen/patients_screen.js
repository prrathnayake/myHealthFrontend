import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../../components/navBar/navBar";
import apiEndpoint from "../../utils/api";

export default function PatientsScreen() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    axios
      .get(`${apiEndpoint}patients/doctorId?id=${id}`)
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  }, []);

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
  });

  function calculateAge(bday) {
    let birthdate = new Date(bday);
    let diff_ms = Date.now() - birthdate.getTime();
    let age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  return (
    <>
      <NavBar />
      <div>
        <h1>Patients List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  {patient.firstName} {patient.lastName}
                </td>
                <td>{calculateAge(patient.bdate)}</td>

                <td>{patient.mobile}</td>
                <td>{patient.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
