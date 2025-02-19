import { useState, useEffect, useRef } from "react";
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
        <button className="client-login">CLIENT LOGIN</button>
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
            <li>Our Vision</li>
            <li>Impact</li>
            <li>Product</li>
            <li>Resources</li>
            <li>About Us</li>
            <li>Pricing</li>
            <li>Client Login</li>
            <li>Contact Us</li>
          </ul>
          <div className="search-container">
            <input type="text" placeholder="Search ..." />
            <button>🔍</button>
          </div>
          <p>FAQs</p>
          <p>Privacy Policy</p>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
