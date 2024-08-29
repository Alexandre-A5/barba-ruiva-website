import React from "react";
import './Prestation.css';
import Cube from '../../Components/3DItems/Cube';
import Phone from '../../Components/Phone';



const Prestation = () => {

    return(
        <div className="prestation-container">
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