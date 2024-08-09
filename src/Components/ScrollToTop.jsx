import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(location.pathname, { replace: true });
    window.scrollTo(0, 0);
  }, [location.pathname, navigate]);

  return null;
}
