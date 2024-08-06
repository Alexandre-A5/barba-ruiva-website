// SmoothScroll.js
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SmoothScroll = ({ children }) => {
  const scrollY = useRef(0);
  const controls = useAnimation();

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const newY = window.scrollY;
      if (Math.abs(newY - scrollY.current) > 1) {
        animationFrameId = requestAnimationFrame(() => {
          controls.start({ y: -newY, transition: { duration: 1, ease: "easeOut" } });
        });
        scrollY.current = newY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default SmoothScroll;
