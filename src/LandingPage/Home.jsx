// pages/Home.js
import SectionOne from "./FirstSection/Section1";
import SectionTwo from "./SecondSection/Section2";
import Section3 from "./ThirdSection/Section3"
import Section4 from "./FourthSection/Section4"
import Base from "./Base/BaseSection"
import "./homeStyle.css";

const Home = () => {
  return (
    <div className="home">
      <Base />
      <SectionOne />
      <SectionTwo />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default Home;
