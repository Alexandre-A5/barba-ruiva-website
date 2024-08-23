import React, { useEffect } from 'react';

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/alexandreaugepro"  // Remplacez par votre URL Calendly
      ></div>
    </div>
  );
};

export default CalendlyWidget;
