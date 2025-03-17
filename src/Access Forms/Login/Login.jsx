import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from 'react-router-dom';
import logo from "../../assets/albertzoomd-logo_01-02-2.png";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      setError(error.message);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Clear any previous errors
    setError("");

    // Validate inputs
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Login successful
      const user = userCredential.user;
      console.log("User logged in:", user);

      // Redirect to Albert.ai page
      navigate("/Albert.ai");
    } catch (error) {
      // Handle errors
      console.error("Error logging in:", error.code, error.message);

      // Display specific error messages
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;
        case "auth/network-request-failed":
          setError("Check your connection.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="logo" className="login-logo" />
        <input 
        type="email" 
        placeholder="Your email" 
        className="input-field" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

          <a href="#"className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</a>
        <button  type="submit" onClick={handleLogin} className="login-button">
          {loading ? "Logging in..." : "Login"}
        </button>
         {/* Error Message */}
         {error && <p className="login-error-message">{error}</p>}
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
