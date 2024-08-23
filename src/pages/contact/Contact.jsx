import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    

    useEffect(() => {
        AOS.init({
            duration: 2000, // Durée de l'animation en millisecondes
            once: true,     // Animation ne se joue qu'une seule fois
        });
    }, []);

    return (
        <div className="contact-page-container">
            <h1 data-aos='fade-in'>Déroulement de la prise de contact</h1>
            <div className="line-container">
                <span className="line line-left"></span>
                <span className="line line-middle"></span>
                <span className="line line-right"></span>
            </div>
            <div className="first-step">
                <p>On prends contacte
                (appel / mail )</p>
            </div>
            <div className="second-step">
                <p>On parle de ton projet et de tes envies</p>
            </div>
            <div className="third-step">
                <p>On prends rendez vous</p>
            </div>
            <div className="fourth-step">
                <p>Et tu prends confiance</p>
            </div>
        </div>
    );
};

export default Contact;
