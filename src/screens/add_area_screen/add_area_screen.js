import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import axios from "axios";

export default function AddAreaScreen() {
  const [area, setArea] = useState("");

  const submit = async () => {
    window.location.reload(false);
    await axios({
      method: 'POST',
      url: 'http://localhost:3001/area',
      data: {
        area: area.toLowerCase()
      }
    }).catch(function (error) {
      console.log(error);
    });
    setArea("");
  };

  return (
    <>
      <NavBar />
      <div className="add-staff-screen">
        <h1 className="add-staff-screen-title">New Area</h1>
        <form className="add-staff-screen-form">
          <div className="add-staff-screen-input-div">
            <label className="label" name="role">
              New Role
            </label>
            <input
              placeholder="area"
              type="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          <button
            className="add-staff-screen-form-button"
            type="button"
            onClick={submit}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}