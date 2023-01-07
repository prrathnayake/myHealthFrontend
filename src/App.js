import HomeScreen from "./screens/home_screen/home_screen";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/login_screen/login_screen";
import AppointmentScreen from "./screens/appoinment_screen/appointment_screen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />}/>
        <Route path="/appointments" element={<AppointmentScreen />}/>
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
