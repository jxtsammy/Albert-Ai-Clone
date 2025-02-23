// pages/Home.js
import Tasks from './Sec2/Tasks'
import Quote from './Quote/Quote'
import NavigationBar from '../Navigation/NavigationBar';
import Footer from '../Footer/Footer';
import "./Vision.css"

const Vision = () => {
  return (
    <div className="home">
      <NavigationBar/>
      <Quote/>
      <Tasks/>
      <Footer/>
    </div>
  );
};

export default Vision;
