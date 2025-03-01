import './S3.css';
import bingIcon from '../../assets/bing.svg';
import instagramIcon from '../../assets/instagram.svg';
import facebookIcon from '../../assets/facebookColorful.svg';
import youtubeIcon from '../../assets/youtubeColorful.svg';
import tiktokIcon from '../../assets/tik-tok-png-logo-1.png';
import display from '../../assets/DV360-logo.png';
import logo from '../../assets/albertzoomd-logo_01-01.png';
import { Typewriter } from "react-simple-typewriter";

const features = [
  { icon: bingIcon, text: 'Bing' },
  { icon: instagramIcon, text: 'Instagram' },
  { icon: facebookIcon, text: 'Facebook' },
  { icon: youtubeIcon, text: 'YouTube' },
  { icon: tiktokIcon, text: 'TikTok' },
  { icon: display, text: 'Display & Video 360' },
];

const ResultsSection = () => {
  return (
    <div className="results-wrapper">
      {/* Logo */}
      <img src={logo} alt="Company Logo" className="brand-logo" />

      {/* Title */}
      <div className='title-container'>
        <h2 className="primary-heading">
          <Typewriter
                words={["operates in your paid search, social, programmatic accounts",
                  "always here to be of help to our customers, for you are our priority"
                ]}
                loop={'true'}
                typeSpeed={80}
                deleteSpeed={100}
                delaySpeed={1500}
              />
        </h2>

        <div className="S3-floating-animation">
          <div className="S3-floatin-square  s1"></div>
          <div className="S3-floatin-square  s2"></div>
          <div className="S3-floatin-square  s3"></div>
          <div className="S3-floatin-square  s4"></div>
          <div className="S3-floatin-square  s5"></div>
          <div className="S3-floatin-square  s6"></div>
          <div className="S3-floatin-square  s7"></div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="secondary-text">Covers 90% of the biddable universe</p>

      {/* Feature Icons */}
      <div className="icon-container">
        {features.map((feature, index) => (
          <div key={index} className="icon-box">
            <img src={feature.icon} alt={feature.text} className="icon-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsSection;
