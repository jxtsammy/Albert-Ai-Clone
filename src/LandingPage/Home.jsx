// pages/Home.js
import SectionOne from "./FirstSection/Section1";
import SectionTwo from "./SecondSection/Section2";
import Section3 from "./ThirdSection/Section3"
import Section4 from "./FourthSection/Section4"
import Base from "./Base/BaseSection"
import NavigationBar from "../Navigation/NavigationBar";
import Footer from "../Footer/Footer";
import "./homeStyle.css";

const Home = () => {
  return (
    <div className="home">
      <NavigationBar />
      <Base />
      <SectionOne />
      <SectionTwo />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
};

export default Home;
