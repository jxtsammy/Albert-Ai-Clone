import { Typewriter } from "react-simple-typewriter";
import "./BStyles.css";
import logo from "../../assets/albertzoomd-logo_01-02-2.png"; // Import your logo image

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        {/* Logo */}
        <img src={logo} alt="Logo" className="hero-logo" />

        {/* Header with Floating Squares beside Text */}
        <div className="hero-text-container">
          <h1>
            <span className="hero-typewriter">
              <Typewriter
                words={["self-learning digital marketin ally", "is executing and optimizing every step of your campaign", "is unprecedented impact"]}
                loop={true}
                typeSpeed={150}
                deleteSpeed={150}
                delaySpeed={1500}
              />
            </span>
          </h1>

          {/* Floating Squares */}
          <div className="hero-floating-squares">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="hero-square"></div>
            ))}
          </div>
        </div>

        {/* Learn More Button */}
        <button className="hero-learn-more">LEARN MORE →</button>
      </div>
    </div>
  );
};

export default Hero;