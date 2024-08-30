import React from "react";
import { useEffect } from "react";
import Phone from '../../Components/Phone';

import './Prestation.css';
import Radio from "../../Components/Radio";
import PlayButton from "../../Components/Playbutton";
import Note from "../../Components/Note";


const Prestation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <div className="prestation-container">
            <div className="model3d-presta-container">
                <Radio className="radio-page-presta"/>
                <PlayButton className="playbutton-page-presta"/>
                <Note className="note-page-presta"/>
            </div>
            <div className="prestation-title">
                <h1 data-aos='fade-in'>Cours de guitare sur andlau et alentours</h1>
                <h3 data-aos='fade-in'>à partir de 15€/heure</h3>
            </div>

            <div className="presta-step">
                <div className="presta-step-one">
                    <h3>Définition des Objectifs</h3>
                    <p>Avant chaque cours, nous discutons ensemble de vos attentes et des aspects spécifiques que vous souhaitez travailler (style musical, morceaux, techniques, etc.).</p>
                </div>

                <div className="presta-step-two">
                    <h3>Travail sur le Répertoire</h3>
                    <p>Pendant 30 minutes, nous nous concentrons sur les morceaux ou techniques choisis. Cette partie du cours est entièrement personnalisée pour répondre à vos objectifs.</p>
                </div>
                <div className="presta-step-three">
                    <h3>Exercices Techniques</h3>
                    <p>Nous consacrons environ 10 minutes à des exercices techniques, tels que les gammes et les arpèges, pour renforcer votre dextérité et votre maîtrise de l'instrument.</p>
                </div>
                <div className="presta-step-four">
                    <h3>Jeu en Duo</h3>
                    <p>Le reste du cours est dédié à jouer ensemble un morceau. Cette pratique en duo est cruciale pour développer votre sens du rythme, votre écoute et votre musicalité.</p>
                </div>
            </div>
            <div className="presta-contact-lowerpage">
                <div className='contact-container'>
                    <span>Contactez moi</span>
                </div>

                <Phone/>
            </div>
        </div>
    )
}

export default Prestation;