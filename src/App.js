import HomeScreen from "./screens/home_screen/home_screen";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/login_screen/login_screen";
import AppointmentScreen from "./screens/appoinment_screen/appointment_screen";
import AddStaffScreen from "./screens/add_staff_screen/add_staff_screen";
import AddRoleScreen from "./screens/add_role_screen/add_role_screen";
import AddAreaScreen from "./screens/add_area_screen/add_area_screen";
import AddHospitalScreen from "./screens/add_hospital_screen/add_hospital_screen";
import AddAvailableTimeScreen from "./screens/add_available_time_screen/add_available_time_screen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />}/>
        <Route path="/appointments" element={<AppointmentScreen />}/>
        <Route path="/addStaff" element={<AddStaffScreen />}/>
        <Route path="/addRole" element={<AddRoleScreen />}/>
        <Route path="/addArea" element={<AddAreaScreen />}/>
        <Route path="/addHospital" element={<AddHospitalScreen />}/>
        <Route path="/addAvailableTime" element={<AddAvailableTimeScreen />}/>
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
  );
}

export default App;
