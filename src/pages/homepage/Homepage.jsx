
import React, { useEffect } from 'react';
import Cube from '../../Components/3DItems/Cube';
import Sphere from '../../Components/3DItems/Sphere';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Homepage.css';
import HomePicture from '../../assets/PhotoStan.jpeg';
import PrestaPicture from '../../assets/PhotoStan2.jpeg';
import Intro from '../../Components/Intro/Intro';
import { motion } from 'framer-motion';


const Homepage = () => {
  const h2text = "Cours de guitare sur mesure avec exercices techniques et jeu en duo".split(" ");

  useEffect(() => {
    AOS.init({
      duration: 2000, // Durée de l'animation en millisecondes
      once: true,     // Animation ne se joue qu'une seule fois
    });
  }, []);
  return (
    <div 
    className="homepage-container">
      <Intro/>
      
        <Sphere 
        size={3} 
        color={0xffffff} 
        position={{ x: 0, y: 0, z: 0 }} 
        className='profil-sphere'/>
     

        <Cube
        size={1.5} color={0xFE5F00} 
        position={{ x:0, y:0, z:0}} 
        className='profil-cube'/>
        <div className='profil-container' >
          <img
                src={HomePicture}
                alt="Barba Ruiva en concert"
                data-aos="flip-left"
              />
          <Sphere 
          size={3} color={0xffffff} 
          position={{ x:0, y:0, z:0}} 
          className='profil-sphere2'/>
          <Cube
          size={1.5} color={0xFE5F00} 
          position={{ x:0, y:0, z:0}} 
          className='profil-cube2'/>

        <div className='profil-subtitle'>
          {h2text.map((el, i) => (
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.45,
              delay: i / 10
            }}
            key={i}
          >
            {el}{" "}
          </motion.h2>
        ))}
        </div>
      </div>
        <div className='presentation-container'>
          <h3>A propos de moi</h3>
          <p>Guitariste et Bassiste. J’ai commencé il y a 10 ans et aujourd’hui je prépare une licence en musicologie ainsi qu’un Diplôme d'Etude Musicale du conservatoire dans le département JAZZ.</p>
        </div>
      <Sphere 
      size={1} 
      color={0xffffff} 
      position={{ x: 0, y: 0, z: 0 }} 
      className='presentation-sphere'/>
      
      <div className='presta-container'>
        <img src={PrestaPicture} alt="Barba Ruiva" draggable='false' />
        <div className='right-container'>
          <p>Je donne des cours de guitare à Andlau et ses alentours. Le tarif est de 15€ / heure</p>
          <a href="/contact"><button>En savoir plus</button></a>
        </div>
      </div>
      <div className='contact-container'>
        <span>Contactez moi</span>
      </div>
        <Cube 
        size={3} 
        color={0xffffff} 
        position={{ x: 0, y: 0, z: 0 }} 
        className='homepage-cube' />
    </div>

  );
};

export default Homepage;
