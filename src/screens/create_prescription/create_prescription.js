import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import Prescription from "./components/prescription";
import { PDFViewer } from "@react-pdf/renderer";
import "./create_prescription.css";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { useNavigate } from "react-router";
import { roleContext } from "../../resources/contexts/role";

export default function CreatePerscription() {
  const navigate = useNavigate();
  const { role } = useContext(roleContext);
  const [isShow, setIsShow] = useState(false);
  const [patients, setPatients] = useState("");
  const [advice, setAdvice] = useState("");
  const [patientsList, setPatientsList] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    axios
      .get(`${apiEndpoint}patients/patientIDs?id=${id}`)
      .then((response) => {
        setPatientsList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = () => {
    if (patients === "" || advice === "") {
      return setErr("please fill all");
    }
    setIsShow(true);
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
    if (role !== 1) {
      navigate(`/`);
    }
  });

  return (
    <>
      <NavBar />
      {isShow ? (
        <div className="createPerscription-screen">
          <PDFViewer height={"100%"} width={"100%"}>
            <Prescription patientID={patients} advice={advice} />
          </PDFViewer>
        </div>
      ) : (
        <div className="createPerscription-screen add-staff-screen">
          <h1 className="add-staff-screen-title">Create a Prescription</h1>
          <div className="add-staff-screen-input-div">
            <label className="label" name="role">
              Patient Name
            </label>
            <select
              id="role"
              name="role"
              className="add-staff-screen-dropdown"
              value={patients}
              onChange={(e) => setPatients(e.target.value)}
            >
              <option value="" />
              {patientsList.map((patient) => (
                <option key={patient["patientID"]} value={patient["patientID"]}>
                  {patient["firstName"]}
                  {patient["lastName"]}
                </option>
              ))}
            </select>
          </div>
          <div className="add-staff-screen-input-div">
            <label className="label" name="firstName">
              Advices
            </label>
            <textarea
              type="textarea"
              value={advice}
              rows={20}
              cols={100}
              onChange={(e) => setAdvice(e.target.value)}
              required
            />
          </div>
          <button
            className="add-staff-screen-form-button"
            type="button"
            onClick={onSubmit}
          >
            Create
          </button>
          {err === "" ? null : <p>{err}</p>}
        </div>
      )}
    </>
  );
}
