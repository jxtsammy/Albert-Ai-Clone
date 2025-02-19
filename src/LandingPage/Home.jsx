import { Typewriter } from "react-simple-typewriter";
import { FaPen, FaBrain, FaRocket } from "react-icons/fa";
import "./homeStyle.css";

const LandingPage = () => {
  return (
    <div>
      {/* First Section */}
      <div className="ad-challenges-container">
        <div className="solveHeader">
          <h1 className="title">
            <Typewriter
              words={["solves top digital advertising challenges"]}
              loop={1}
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>

          <div className="icon-grid">
            <div className="square blue"></div>
            <div className="square white"></div>
            <div className="square neon"></div>
            <div className="square gray"></div>
            <div className="square blue"></div>
            <div className="square white"></div>
            <div className="square neon"></div>
            <div className="square gray"></div>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <h3>24/7 Optimization</h3>
            <p>Marketers return to focus on customer experience</p>
          </div>
          <div className="divider"></div>
          <div className="feature">
            <h3>Moneyball Media</h3>
            <p>Maximize overall performance within and across channels</p>
          </div>
          <div className="divider"></div>
          <div className="feature">
            <h3>Personalization At Scale</h3>
            <p>Master creative relevance for every micro audience</p>
          </div>
          <div className="divider"></div>
          <div className="feature">
            <h3>No Shopper Left Behind</h3>
            <p>Reach new audience groups without spending more</p>
          </div>
        </div>

        <div className="learn-more">
          <span>LEARN MORE</span> <span className="arrow">➜</span>
        </div>
      </div>

      {/* Second Section */}
      <div className="next-section-container">
        <h1 className="next-title">
          the world’s only <br /> marketing AI that is...
        </h1>

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
    </div>
  );
};

export default LandingPage;
