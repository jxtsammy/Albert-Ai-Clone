import React from "react";
import "./Contact.css";
import logo from "../assets/albertzoomd-logo_01-01.png";
import NavigationBar from "../Navigation/NavigationBar";
import Footer from "../Footer/Footer";

export default function ContactUs() {
  return (
    <div className="contactus-container">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Header Section */}
      <div className="contactus-header">
        <img src={logo} alt="Albert Logo" className="contactus-logo-img" />
      </div>

      {/* Main Content */}
      <div className="contactus-content">
        <h2>Contact Us</h2>
      </div>

      {/* Floating Squares */}
      <div className="contactus-floating-squares">
        <div className="contactus-square contactus-yellow contactus-big"></div>
        <div className="contactus-square contactus-gray contactus-medium"></div>
        <div className="contactus-square contactus-yellow contactus-small"></div>
        <div className="contactus-square contactus-blue contactus-medium2"></div>
        <div className="contactus-square contactus-dark-blue contactus-small2"></div>
      </div>

      {/* Bottom Blue Bar */}
      <div className="contactus-bottom-bar"></div>

      {/* Contact Form */}
      <div className="contactus-form-container">
        <form className="contactus-form">
          <div className="contactus-name-group">
            <input type="text" placeholder="First Name" className="contactus-input" />
            <input type="text" placeholder="Last Name" className="contactus-input" />
          </div>
          <input type="email" placeholder="Email" className="contactus-input" />
          <input type="text" placeholder="Country" className="contactus-input" />
          <input type="text" placeholder="Title" className="contactus-input" />

          <select className="contactus-input">
            <option>Type of company *</option>
            <option>Agency</option>
            <option>Brand</option>
            <option>Other</option>
          </select>

          <select className="contactus-input">
            <option>What is your yearly advertising budget?</option>
            <option>Less than $50,000</option>
            <option>$50,000 - $500,000</option>
            <option>More than $500,000</option>
          </select>

          <button type="submit" className="contactus-submit-btn">Submit</button>
        </form>

        {/* Partnership Information */}
        <div className="contactus-partnership">
          <h3>Albert’s Partnership Program</h3>
          <p>
            If you’re an agency seeking to boost your clients’ marketing efforts with Albert’s exceptional platform, then let’s talk! <br />
            Contact us directly to discuss our unparalleled partnership program:
            <a href="mailto:albert@zoomd.com"> albert@zoomd.com</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
