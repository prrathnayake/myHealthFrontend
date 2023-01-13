import React, { useContext, useState } from "react";
import "./login_screen.css";
import axios from "axios";
import apiEndpoint from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { roleContext } from "../../resources/contexts/role.js";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setRole } = useContext(roleContext);

  const login = async (e) => {
    e.preventDefault();
    if (email !== "" || password !== "") {
      try {
        setEmail("");
        setPassword("");
        await axios
          .post(`${apiEndpoint}auth/login`, {
            email: email,
            password: password,
          })
          .then((res) => {
            if (res.data.accessToken) {
              localStorage.setItem(
                "token",
                JSON.stringify(res.data.accessToken)
              );
              localStorage.setItem("id", JSON.stringify(res.data.id));
              console.log(res.data.role);
              setRole(res.data.role);
              if (res.data.role === "admin") return navigate(`/admin`);
              navigate(`/`);
            } else {
              setErr(res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="Login">
      <div className="login-form">
        <form className="form" onSubmit={login}>
          <label className="label" name="email">
            Email
          </label>
          <input
            placeholder="Enter your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label" name="password">
            Password
          </label>
          <input
            placeholder="Enter your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {err ? <p className="err-msg">{err}</p> : null}
          <button type="submit" onClick={login}>
            LogIn
          </button>
          {/* <label className="forget">Forget password? </label> */}
        </form>
      </div>
    </div>
  );
}
