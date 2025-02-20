import { FaPen, FaBrain, FaRocket } from "react-icons/fa";
import "./section.css";

const LandingPage = () => {
  return (
      <div className="next-section-container">
        <div className="solveHeader">
          <h1 className="next-title">
            the world’s only <br /> marketing AI that is...
          </h1>

          <div className="ai-circle">
            <div className="ai-box ai-blue"></div>
            <div className="ai-box ai-white"></div>
            <div className="ai-box ai-neon"></div>
            <div className="ai-box ai-gray"></div>
            <div className="ai-box ai-blue"></div>
            <div className="ai-box ai-white"></div>
            <div className="ai-box ai-neon"></div>
            <div className="ai-box ai-gray"></div>
          </div>
        </div>

        <div className="next-features">
          <div className="next-feature">
            <FaPen className="next-feature-icon" />
            <h3>Autonomous</h3>
            <p>Self-optimizing campaign design and management</p>
          </div>

          <div className="next-divider"></div>

          <div className="next-feature">
            <FaBrain className="next-feature-icon" />
            <h3>Cross-Channel</h3>
            <p>Holistic, agile cross-channel strategy and execution</p>
          </div>

          <div className="next-divider"></div>

          <div className="next-feature">
            <FaRocket className="next-feature-icon" />
            <h3>Fast Start</h3>
            <p>Implement in weeks, not months, in existing ad accounts</p>
          </div>
        </div>

        <div className="next-learn-more">
          LEARN MORE <span className="next-arrow">➜</span>
        </div>
      </div>
  );
};

export default LandingPage;
