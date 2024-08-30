import React, {useEffect }from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homepage from './pages/homepage/Homepage';
import Prestation from './pages/prestation/Prestation';
import Contact from './pages/contact/Contact';
import MentionsLegales from './pages/MentionLegales';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="prestation" element={<Prestation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals();
