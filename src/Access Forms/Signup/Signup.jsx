import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { Typewriter } from "react-simple-typewriter";
import logo from "../../assets/albertzoomd-logo_01-02-2.png"; // Your logo path
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password toggle
import { Link } from 'react-router-dom';
import { auth, firestore } from "../../index"; // Import Firebase auth and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Set loading state
    setLoading(true);

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear any previous errors
    setError("");

    try {
      // Step 1: Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password // Use the `password` field, not `confirmPassword`
      );

      // Signed up successfully
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Step 2: Save additional user data to Firestore
      await setDoc(doc(firestore, "Users", user.uid), {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(), // Add a timestamp
      });

      console.log("User data saved to Firestore");

      // Redirect to Albert.ai page
      navigate("/Albert.ai");
    } catch (error) {
      // Handle errors
      console.error("Error signing up:", error.message);
      setError(error.message); // Display error message to the user

       // Display specific error messages
       switch (error.code) {
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

          {/* Email Input */}
          <input
            type="phone"
            placeholder="Enter Phone"
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit" className="signup-button">
          {loading ? "Creating Account..." : "Register"}
          </button>
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
