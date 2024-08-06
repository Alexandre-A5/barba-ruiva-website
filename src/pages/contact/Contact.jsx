import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    const [svgHeight, setSvgHeight] = useState(150);
    const [hovered, setHovered] = useState({
        cord1: false,
        cord2: false,
        cord3: false
    });

    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();

    useEffect(() => {
        AOS.init({
            duration: 2000, // Durée de l'animation en millisecondes
            once: true,     // Animation ne se joue qu'une seule fois
          });
        const handleResize = () => {
            setSvgHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        controls1.start("visible");
        controls2.start("visible");
        controls3.start("visible");

        return () => window.removeEventListener('resize', handleResize);
    }, [controls1, controls2, controls3]);

    const handleMouseEnter = (cord) => {
        setHovered((prev) => ({ ...prev, [cord]: true }));
        if (cord === 'cord1') controls1.start("hover");
        if (cord === 'cord2') controls2.start("hover");
        if (cord === 'cord3') controls3.start("hover");
    };

    const handleMouseLeave = (cord) => {
        setTimeout(() => {
            setHovered((prev) => ({ ...prev, [cord]: false }));
            if (cord === 'cord1') controls1.start("rest");
            if (cord === 'cord2') controls2.start("rest");
            if (cord === 'cord3') controls3.start("rest");
        }, 3000);
    };


    const waveVariants = {
        rest: { 
            d: "M0,0 L0,1000",
            transition: {
                duration: 0
            }
        },
        hover: {
            d: [
                "M0,0 Q35,500 0,1000",
                "M0,0 Q-35,500 0,1000",
                "M0,0 Q15,500 0,1000",
                "M0,0 Q-15,500 0,1000",
                "M0,0 Q5,500 0,1000",
                "M0,0 Q-5,500 0,1000",
                "M0,0 Q0,500 0,1000"
            ],
            transition: {
                duration: 1.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="contact-page-container">
            <h1 data-aos='fade-in'>Déroulement de la prise de contact</h1>
                <div className="circle1">
                    <p>On prends contacte par téléphone ou par mail</p>
                    <span></span>
                </div>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
            <svg
                viewBox="0 0 200 1000" // Ajustez la vue en fonction de la taille des lignes et de l'espacement
                width="200" // Augmentez la largeur pour s'adapter à l'espacement
                height={svgHeight} // Hauteur dynamique
                className="contact-progress"
            >
                <g transform="translate(-40, 100)">
                    <rect
                        x="-50"
                        y="0"
                        width="100"
                        height="1000"
                        fill="transparent"
                        onMouseEnter={() => handleMouseEnter('cord1')}
                        onMouseLeave={() => handleMouseLeave('cord1')}
                    />
                    <motion.path
                        d="M0,0 L0,1000" // Ligne droite initiale
                        stroke="var(--second-color)"
                        strokeWidth="10"
                        fill="transparent"
                        variants={waveVariants}
                        initial="rest"
                        animate={hovered.cord1 ? "hover" : "rest"}
                    />
                </g>
                <g transform="translate(80, 0)">
                    <rect
                        x="-50"
                        y="0"
                        width="100"
                        height="1000"
                        fill="transparent"
                        onMouseEnter={() => handleMouseEnter('cord2')}
                        onMouseLeave={() => handleMouseLeave('cord2')}
                    />
                    <motion.path
                        d="M0,0 L0,1000"
                        stroke="var(--complementary-color)"
                        strokeWidth="20"
                        fill="transparent"
                        variants={waveVariants}
                        initial="rest"
                        animate={hovered.cord2 ? "hover" : "rest"}
                    />
                </g>
                <g transform="translate(200, 100)">
                    <rect
                        x="-50"
                        y="0"
                        width="100"
                        height="1000"
                        fill="transparent"
                        onMouseEnter={() => handleMouseEnter('cord3')}
                        onMouseLeave={() => handleMouseLeave('cord3')}
                    />
                    <motion.path
                        d="M0,0 L0,1000"
                        stroke="var(--second-color)"
                        strokeWidth="10"
                        fill="transparent"
                        variants={waveVariants}
                        initial="rest"
                        animate={hovered.cord3 ? "hover" : "rest"}
                    />
                </g>
            </svg>
        </div>
    );
};

export default Contact;
