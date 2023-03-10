import HomeScreen from "./screens/home_screen/home_screen";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/login_screen/login_screen";
import AppointmentScreen from "./screens/appoinment_screen/appointment_screen";
import AddStaffScreen from "./screens/add_staff_screen/add_staff_screen";
import AddRoleScreen from "./screens/add_role_screen/add_role_screen";
import AddAreaScreen from "./screens/add_area_screen/add_area_screen";
import AddHospitalScreen from "./screens/add_hospital_screen/add_hospital_screen";
import AddAvailableTimeScreen from "./screens/add_available_time_screen/add_available_time_screen";
import PatientsScreen from "./screens/patients_screen/patients_screen";
import ProfileScreen from "./screens/profile_screen/profile_screen";
import { roleContext } from "./resources/contexts/role.js";
import { useEffect, useState } from "react";
import axios from "axios";
import apiEndpoint from "./utils/api.js";
import ChatScreen from "./screens/chat_screen/chat_screen";
import ChatListScreen from "./screens/chat_list_screen/chat_list_screen";
import CreatePerscription from "./screens/create_prescription/create_prescription";
import SendPrescriptionScreen from "./screens/send_prescripton_screen/send_prescripton_screen";

function App() {
  const [role, setRole] = useState(0);

  const getRole = async (accessToken, id) => {
    await axios({
      method: "POST",
      url: `${apiEndpoint}auth/getRole`,
      data: {
        accessToken: accessToken,
        id: id
      },
    })
      .then((res) => {
        if (res.data === "not authenticated") {

        } else {
          setRole(res.data.role);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    const id = JSON.parse(localStorage.getItem("id"));
    getRole(accessToken, id);
  });
  return (
    <roleContext.Provider value={{ role, setRole }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/appointments" element={<AppointmentScreen />} />
          <Route path="/addStaff" element={<AddStaffScreen />} />
          <Route path="/addRole" element={<AddRoleScreen />} />
          <Route path="/addArea" element={<AddAreaScreen />} />
          <Route path="/addHospital" element={<AddHospitalScreen />} />
          <Route
            path="/addAvailableTime"
            element={<AddAvailableTimeScreen />}
          />
          <Route path="/patients" element={<PatientsScreen />} />
          <Route path="/chats" element={<ChatListScreen />} />
          <Route path="/chatScreen/:roomId/:uid" element={<ChatScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/createPrescription" element={<CreatePerscription />} />
          <Route path="/sendPrescription" element={<SendPrescriptionScreen />} />
          <Route
            path="*"
            element={
              <main>
                <h1>There's nothing here!</h1>
              </main>
            }
          />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </div>
    </roleContext.Provider>
  );
}

export default App;
