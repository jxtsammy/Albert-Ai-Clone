import "./FStyle.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Partener from "../assets/facebookp.svg"
import logo from "../assets/albertzoomd-logo_01-02-2.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
      <img src={logo} alt="logo" className="logo"/>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
        </div>
        <div className="partners">
          <img src={Partener} alt="Partners" />
        </div>
      </div>

      <div className="footer-center">
        <ul>
          <li>Our Vision</li>
          <li>Impact</li>
          <li>Product</li>
          <li>About Us</li>
          <li>Resources</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div className="footer-right">
        <ul>
          <li>FAQs</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
