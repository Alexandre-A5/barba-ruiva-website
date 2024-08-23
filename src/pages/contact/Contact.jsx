import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CalendlyWidget from '../../Components/CalendlyWidget'; // Assurez-vous que le chemin est correct

const Contact = () => {
    

    useEffect(() => {
        AOS.init({
            duration: 2000, // Durée de l'animation en millisecondes
            once: true,     // Animation ne se joue qu'une seule fois
        });
    }, []);

    return (
        <>
        <div className="contact-page-container">
            <h1 data-aos='fade-in'>Déroulement de la prise de contact</h1>
            <div className="line-container">
                <span className="line line-left"></span>
                <span className="line line-middle"></span>
                <span className="line line-right"></span>
            </div>
            <div className="first-step">
                <p>On prends contact
                (appel / mail )</p>
                <span className="first-orange-circle"></span>
            </div>
            <div className="second-step">
                <span className="second-orange-circle"></span>
                <p>On parle de ton projet et de tes envies</p>
            </div>
            <div className="third-step">
                <p>On prends rendez vous</p>
                <span className="third-orange-circle"></span>
            </div>
            <div className="fourth-step">
            <span className="fourth-orange-circle"></span>
                <p>Et tu prends confiance</p>
            </div>
        </div>

            <div className="contact-card">
                <div className="appointment">
                    <h1>Prendre Rendez-vous</h1>
                    <CalendlyWidget />
                </div>
                {/*    <h3>Ou contactez moi ici</h3>
                 <div className="info-card-container">
                    <div className="phoneNumber">
                        <p>Mon numéro</p>
                        <p>06 06 06 06 06</p>
                    </div>
                    <div className="email">
                        <p>Mon mail</p>
                        <p>stanislasbaugnet@gmail.com</p>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default Contact;
