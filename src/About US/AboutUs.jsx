import "./About.css";
import logo from "../assets/albertzoomd-logo_01-01.png";// Replace with the correct path to your image
import NavigationBar from "../Navigation/NavigationBar";
import Footer from "../Footer/Footer";
const AboutUs = () => {
  return (
    <div className="about-container">
      <NavigationBar />
      <img src={logo} alt="Albert by Zoomd" className="logo" />
      <div className="info">
        <h2 className="title">About Us</h2>
        <p className="description">
        Albert by Zoomd (TSXV:ZOMD) is<strong> a cloud-based artificial intelligence platform that plugs into a digital marketer’s existing tech stack and operates it.</strong>
          Albert is the self-learning digital marketing ally for marketers: a thinker, a doer, and a support system; autonomously orchestrating and evolving campaigns.
        </p>
        <p className="sub-text">
          Albert.ai was acquired by Zoomd Technologies in 2022. <br />
          For the <a href="#" className="link">full announcement</a> visit Zoomd website.
        </p>
        <button className="about-button">SEE ZOOMD LEADING TEAM</button>
        </div>
        <div className="colored-box yellow-large"></div>
        <div className="colored-box blue-small"></div>
        <div className="colored-box yellow-small"></div>
      <div className="colored-box grey-medium"></div>

      <div className="careers-container">
        {/* Careers Section */}
        <div className="careers-section">
          <h3 className="careers-title">CAREERS</h3>
          <h2 className="careers-heading">Welcome to the future of marketing</h2>
          <p className="careers-description">
            At Albert by Zoomd, we share a vision to improve the quality of life for marketers around the world.
            We’re building a future where an autonomous colleague works alongside humans as a team member doing the impossible and raising everyone’s game.
            Make no mistake, we work hard and play hard – we have to: we’re not just disrupting the digital marketing space, we’re in the vanguard of innovative companies leading the next big shift: the AI Revolution.
          </p>
        </div>

        {/* Open Positions Section */}
        <div className="open-positions">
          <h2 className="positions-title">Open Positions</h2>
          <p className="positions-description">
            Albert by Zoomd is not currently hiring, but we’d love to stay connected! Explore open positions at our main company on the <a href="#" className="link">zoomd.com</a> careers page.
          </p>
        </div>
        <div className="colored-box biggrey-medium"></div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;