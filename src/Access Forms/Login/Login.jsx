import { useState } from "react";
import "./Login.css";
import logo from "../../assets/albertzoomd-logo_01-02-2.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="logo" className="logo" />
        <input type="email" placeholder="Your email" className="input-field" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <a href="#" className="forgot-password">Forgot your password?</a>
        <button className="login-button">Login</button>
        <div className="checkbox-container">
          <label className="checkbox-label">
            Show password characters
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="checkbox-input"
            />
          </label>
          <label className="checkbox-label">
            Remember me on this computer
            <input type="checkbox" defaultChecked className="checkbox-input" />
          </label>
        </div>
      </div>
      <footer>
        <p>Dont have an account? <a href="#">Register</a></p>
      </footer>
      <div className="floating-squares">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`square square-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default Login;
