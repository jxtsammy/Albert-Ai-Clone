import {useState, useEffect} from 'react';
import "./Quote.css";
import logo from "../../assets/albertzoomd-logo_01-02-2.png"; // Update path if needed
import { motion } from "framer-motion";
import quote from '../../assets/quotee.png'

const VisionSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="vision-container">
      {/* Header with Logo */}
      <header className="vision-header">
        <img src={logo} alt="Company Logo" className="vision-logo" />
        <h2 className="vision-title">Our Vision</h2>
      </header>

      {/* Vision Content */}
      <div className="vision-content">

        {/* Quote Box with Animation */}
        <motion.div
          className="vision-quote-box"
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
        >
          <p className="vision-quote">
            “By 2025, all paid digital media campaigns will be managed by
            marketers collaborating with autonomous AI.”
          </p>
          <p className="vision-author">– Or Shani, Founder & Former CEO</p>
        </motion.div>

        {/* Quotation Mark with Animation */}
        <motion.div
          className="vision-quote-mark"
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
         <img src={quote} alt="quote" className="vision-quote-sign" />
        </motion.div>
      </div>
      {/* Decorative Squares */}
      <div className="vision-squares">
          <div className="squares small blue"></div>
          <div className="squares medium gray"></div>
          <div className="squares large neon"></div>
          <div className="squares small neon"></div>
          <div className="squares medium blue"></div>
      </div>
    </div>
  );
};

export default VisionSection;
