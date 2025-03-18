import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Search} from "lucide-react";
import "./NavStyles.css";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // Close sidebar if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <Link to="/login"><button className="client-login">CLIENT LOGIN</button></Link>
        <div className="menu-icon" onClick={() => setIsOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Client Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
            <li><Link to="/vision">Our Vision</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="#">Impact</Link></li>
            <li><Link to="#">Product</Link></li>
            <li><Link to="#">Resources</Link></li>
          </ul>
          <div className="search-container">
            <input type="text" placeholder="Search ..." />
            <button><Search/></button>
          </div>
          <p className="FAQs">FAQs</p>
          <p className="PP">Privacy Policy</p>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
