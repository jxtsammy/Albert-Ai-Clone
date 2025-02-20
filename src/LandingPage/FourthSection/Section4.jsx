import "./Sec4.css";

// Import icons/logos (Replace with actual images or SVGs)
import logo1 from "../../assets/Crabtree-logo-bw.png"; // Example logo imports
import logo2 from "../../assets/interactive-investor-web.png";
import logo3 from "../../assets/Insurance_Icon.png";
import logo4 from "../../assets/Retail_icon.png";

// Feature Data
const features = [
  { img: logo1, title: "New Customer Insights" },
  { img: logo2, title: "Efficient Long Tail Search" },
  { img: logo3, title: "The Human + AI Partnership" },
  { img: logo4, title: "Personalization at Scale" },
];

const ResultsSection = () => {
  return (
    <section className="results-container">
      <h2 className="results-title">RESULTS</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <img src={feature.img} alt={feature.title} className="feature-icon" />
            <h3 className="feature-title">{feature.title}</h3>
          </div>
        ))}
      </div>
      <button className="see-impact-btn">SEE IMPACT</button>
    </section>
  );
};

export default ResultsSection;
