
import React, { useEffect } from 'react';
import Cube from '../../Components/3DItems/Cube';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Homepage.css';
import HomePicture from '../../assets/PhotoStan.jpeg';
import PrestaPicture from '../../assets/PhotoStan2.jpeg';

const Homepage = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Durée de l'animation en millisecondes
      once: true,     // Animation ne se joue qu'une seule fois
    });
  }, []);

  return (
    <div className="homepage-container">
      <div className="intro" data-aos="fade-in">
        <span className='banner'>GUITARISTE / BASSISTE</span>
        <h1>BARBA <br /> RUIVA</h1>
        <div className='scroll-indicator'>
          <span className='scroll-indicator-left'></span>
          <span className='scroll-indicator-right'></span>
        </div>
        <div className='scroll-indicator2'>
          <span className='scroll-indicator-left'></span>
          <span className='scroll-indicator-right'></span>
        </div>
      </div>
      <div className='profil-container' >
        <img src={HomePicture} alt="Barba Ruiva en concert" data-aos="flip-left"/>
        <h2> Cours de guitare sur mesure, avec exercices techniques et jeu en duo</h2>
      </div>

      <div className='presentation-container'>
        <h3>A propos de moi</h3>
        <p>Guitariste et Bassiste. J’ai commencé il y a 10 ans et aujourd’hui je prépare une licence en musicologie ainsi qu’un DEM du conservatoire dans le département JAZZ.</p>
      </div>
      
      <div className='presta-container'>
        <img src={PrestaPicture} alt="Barba Ruiva" />
        <div className='right-container'>
          <p>Je donne des cours de guitare à Andlau et ses alentours. Le tarif est de 15€ / heure</p>
          <a href="/contact"><button>En savoir plus</button></a>
        </div>
      </div>
      <div className='contact-container'>
        <span>Contactez moi</span>
      </div>
      <div className='cube-container'>
        <Cube size={2} color={0xffffff} position={{ x: 0, y: 0, z: 0 }} redirectTo='/contact' />
      </div>
    </div>
  );
};

export default Homepage;
