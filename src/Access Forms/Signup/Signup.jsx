import { useState } from "react";
import "./Signup.css";
import { Typewriter } from "react-simple-typewriter";
import logo from "../../assets/albertzoomd-logo_01-02-2.png"; // Your logo path
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password toggle
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    alert("Sign-up successful!"); // Replace with actual signup logic
  };

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <h1 className="left-header">

          <Typewriter
              words={["Get Registered and have access to your Ai Ally"]}
              loop={1}
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1500}
          />
        </h1>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <img src={logo} alt="logo" className="signup-logo" />

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye />:<FaEyeSlash /> }
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ?  <FaEye />: <FaEyeSlash /> }
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Sign Up Button */}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
      <div className="floating-square">
        {[...Array(100)].map((_, i) => (
          <div key={i} className={`square square-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default SignUp;
