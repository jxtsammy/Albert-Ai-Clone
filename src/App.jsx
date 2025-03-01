import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './LandingPage/Home';
import Login from './Access Forms/Login/Login';
import Signup from './Access Forms/Signup/Signup';
import AboutUs from './About US/AboutUs';
import ContactUs from './Contact Us/Contactus';
import Pricing from './Pricing/Princing';
import Vision from './Our Vision/OurVision';
import Albert from './Ai Interface/Interface'

function App() {
  return (

   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/Albert.ai" element={<Albert />} />
      </Routes>
    </Router>
  );
}

export default App;
