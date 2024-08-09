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
                <div className="circle1">
                    <p>On prends contacte par téléphone ou par mail</p>
                    <span></span>
                </div>

           
        </div>
    );
};

export default Contact;
