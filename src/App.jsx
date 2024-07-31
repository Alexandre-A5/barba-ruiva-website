import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Navbar from './Components/Navbar/Navbar'
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
