import React from "react";
import "./login_screen.css";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [err, setErr] = React.useState('')

  const login = () => {
    return navigate("/");
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
            placeholder="Enter your Email"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {err ? <p className='err-msg'>{err}</p> : null} */}
          <button type="submit" onClick={login}>
            LogIn
          </button>
          <label className="forget">Forget password? </label>
        </form>
      </div>
    </div>
  );
}
