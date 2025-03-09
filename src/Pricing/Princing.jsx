import "react";
import "./Pricing.css";
import logo from "../assets/albertzoomd-logo_01-01.png";
import NavigationBar from "../Navigation/NavigationBar";
import Footer from "../Footer/Footer";

function Pricing() {
  return (
    <div className="pricing-page-container">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Header Section */}
      <header className="pricing-header">
        <img src={logo} alt="Albert Logo" className="pricing-logo" />
      </header>

      {/* Hero Section */}
      <div className="pricing-hero-section">
        <h1>Achieve more with Albert.ai</h1>
      </div>

      <div className="pricing-content-container">
        {/* Left Side - Text Content */}
        <div className="pricing-text-content">
          <p>
            Having Albert.ai by Zoomd as your digital marketing ally is a no-brainer!
          </p><br />
          <p>
            Our cross-channel autonomous AI platform is designed for digital marketers across the digital industry. <br />
            Tell us your marketing needs and we’ll make sure you start experiencing profitable growth in no time!
          </p><br />
          <p>
            Albert’s technology backbone allows teams to identify insights and behaviors beyond the scope of human-operated campaigns,
            solving tech challenges with nuance and precision and extending support beyond campaign management.
          </p><br />
          <p>Contact us for a customized pricing plan.</p>
        </div>

        {/* Right Side - Request Form */}
        <div className="pricing-request-form-section">
          <div className="pricing-form-container">
            <h2>Request an Estimate</h2>
            <form>
              <div className="pricing-form-group">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className="pricing-form-group">
                <input type="email" placeholder="Business Email" required />
                <input type="text" placeholder="Phone Number" required />
              </div>
              <div className="pricing-form-group">
                <input type="text" placeholder="Company Name" required />
                <input type="text" placeholder="Company Website" required />
              </div>
              <div className="pricing-form-group">
                <input type="text" placeholder="Job Title" required />
                <select required>
                  <option value="">Type of company *</option>
                  <option value="agency">Agency</option>
                  <option value="brand">Brand</option>
                </select>
              </div>
              <div className="pricing-form-group">
                <select required>
                  <option value="">What is your yearly advertising budget?</option>
                  <option value="small">Less than $50,000</option>
                  <option value="medium">$50,000 - $500,000</option>
                  <option value="large">More than $500,000</option>
                </select>
              </div>
              <div className="pricing-form-group">
                <textarea placeholder="How did you hear about us?" required></textarea>
              </div>
              <div className="pricing-form-group">
                <textarea placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="pricing-button">Submit</button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Pricing;
