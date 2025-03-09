import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from 'react-router-dom';
import logo from "../../assets/albertzoomd-logo_01-02-2.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate("/Albert.ai");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="logo" className="login-logo" />
        <input type="email" placeholder="Your email" className="input-field" required/>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <a href="#" className="forgot-password">Forgot your password?</a>
        <button  type="submit" onClick={handleLogin} className="login-button">Login</button>
        <div className="checkbox-container">
          <label className="checkbox-label">
          <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="checkbox-input"
            />
            Show password characters
          </label>
          <label className="checkbox-label">
          <input type="checkbox" defaultChecked className="checkbox-input" />
            Remember me on this computer
          </label>
        </div>
      </div>
      <div className="login-footer">
        <p>Dont have an account? <Link to="/signup">Register</Link></p>
      </div>

      <div className="floating-square">
        {[...Array(100)].map((_, i) => (
          <div key={i} className={`square square-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default Login;
