import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Contact from './pages/contact/Contact';
import Footer from './Components/Footer/Footer';
import Prestation from './pages/prestation/Prestation';
import './App.css';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  console.log("Location:", location.pathname); // Log the current location

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage />} />
          <Route path="/prestation" element={<Prestation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default App;
