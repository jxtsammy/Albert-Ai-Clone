import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import man from '../../assets/man.png';
import manAi from '../../assets/manandai.png';
import ai from '../../assets/mo.png';
import "./Tasks.css";

const TaskCards = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="task-cards-section">
      <h2 className="task-cards-title">Machines Do Tasks, Not Jobs</h2>
      <div className="task-cards-container">
        {/* Human Only Activity */}
        <motion.div
          className="task-card task-card-human"
          initial={{ opacity: 0, x: -100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 2 }}
        >
          <img src={man} alt="Human Icon" className="task-card-icon task-card-icon-human" />
          <h3 className="task-card-title">HUMAN ONLY ACTIVITY</h3>
          <ul className="task-card-list">
            <li className="task-card-item">Lead</li>
            <li className="task-card-item">Empathize</li>
            <li className="task-card-item">Create</li>
            <li className="task-card-item">Judge</li>
          </ul>
        </motion.div>

        {/* Human + Machine Collaboration */}
        <motion.div
          className="task-card task-card-human-machine"
          initial={{ opacity: 0, y: 100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 2 }}
        >
          <img src={manAi} alt="Human + Machine Icon" className="task-card-icon task-card-icon-human-machine" />
          <h3 className="task-card-title">HUMAN + MACHINE</h3>
          <p className="task-card-description">
            Instead of operating technology, humans collaborate with it. The machine gives humans superpowers – amplifying and embodying them at a massive scale and pace.
          </p>
        </motion.div>

        {/* Machine Only */}
        <motion.div
          className="task-card task-card-machine"
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 2 }}
        >
          <img src={ai} alt="Machine Icon" className="task-card-icon task-card-icon-machine" />
          <h3 className="task-card-title">MACHINE ONLY</h3>
          <ul className="task-card-list">
            <li className="task-card-item">Transact</li>
            <li className="task-card-item">Iterate</li>
            <li className="task-card-item">Predict</li>
            <li className="task-card-item">Adapt</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskCards;
