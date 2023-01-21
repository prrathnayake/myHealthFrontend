import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../../components/navBar/navBar";
import { roleContext } from "../../resources/contexts/role";
import apiEndpoint from "../../utils/api";
import { db, storage } from "../../utils/firebase";

export default function SendPrescriptionScreen() {
  const navigate = useNavigate();
  const { role } = useContext(roleContext);
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState("");
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
    if (role !== 1 && role !== 2) {
      navigate(`/`);
    }
  });

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    if (!file || patients === "") return setErr("please fill all");
    var uids
    const id = JSON.parse(localStorage.getItem("id"));
    await axios
      .get(
        `${apiEndpoint}firebase/doctorPatientUIDs?patientID=${patients}&doctorID=${id}$`
      )
      .then((response) => {
        uids = response.data[0];
      })
      .catch((error) => console.log(error));

    const storageRef = ref(
      storage,
      `prescriptions/${uids["patientUID"]}/${file.name}`
    );
console.log(uids);
    await uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const doctorDocRef = doc(
          db,
          `doctors/${uids["doctorUID"]}/prescriptions/${file.name}`
        );
        const patientDocRef = doc(
          db,
          `users/${uids["patientUID"]}/prescriptions/${file.name}`
        );

        await setDoc(doctorDocRef, {
          url: url,
          patientUID: uids["patientUID"]
        });

        await setDoc(patientDocRef, {
          url: url,
          doctorUID: uids["doctorUID"]
        });
      });
    });

    setFile(null);
    setPatients('');
    setErr("");
  };
  return (
    <>
      <NavBar />
      <div>
        <div className="add-staff-screen-input-div">
          <label className="label" name="role">
            Patient Name
          </label>
          <select
            id="patient"
            name="patient"
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
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload PDF</button>
        {err === "" ? null : <p>{err}</p>}
      </div>
    </>
  );
}
