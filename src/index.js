import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homepage from './pages/homepage/Homepage';
import Prestation from './pages/prestation/Prestation';
import Contact from './pages/contact/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/prestation" element={<Prestation />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals();
