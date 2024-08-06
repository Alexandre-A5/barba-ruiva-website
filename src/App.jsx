import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  console.log("Location:", location.pathname); // Log the current location

  return (
    <div className="container-fluide">
      <Navbar />
      <AnimatePresence mode='wait'>
        <motion.div
          key={location.pathname}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{ duration: 0.5 }}
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {
              opacity: 0,
            }
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default App;
