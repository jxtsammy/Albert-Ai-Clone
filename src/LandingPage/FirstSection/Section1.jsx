import { Typewriter } from "react-simple-typewriter";
import "./section1.css";

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
