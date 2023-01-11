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
import { useState } from "react";

function App() {
  const [role, setRole] = useState(0);
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
          <Route path="/profile" element={<ProfileScreen />} />
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
