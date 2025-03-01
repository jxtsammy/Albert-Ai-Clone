import "./FStyle.css";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Partener from "../assets/facebookp.svg"
import logo from "../assets/albertzoomd-logo_01-02-2.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
      <div className="logo">
          <img src={logo} alt="logo" />
        </div>
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
          <li><Link to="/vision">Our Vision</Link></li>
            <li><Link to="/impact">Impact</Link></li>
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/login">Client Login</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
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
