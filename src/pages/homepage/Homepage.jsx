import React, { Suspense, useEffect, useState } from 'react';
import AOS from 'aos';
import HomePicture from '../../assets/PhotoStan.jpeg';
import PrestaPicture from '../../assets/PhotoStan2.jpeg';
import Intro from '../../Components/Intro/Intro';
import { motion } from 'framer-motion';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import 'aos/dist/aos.css';
import './Homepage.css';

const Phone = React.lazy(() => import('../../Components/Phone'));
const Microphone = React.lazy(() => import('../../Components/Microphone'));
const Note = React.lazy(() => import('../../Components/Note'));
const Headphones = React.lazy(() => import('../../Components/Headphones'));
const PlayButton = React.lazy(() => import('../../Components/Playbutton'));
const Woofer = React.lazy(() => import('../../Components/Woofer'));
const Radio = React.lazy(() => import('../../Components/Radio'));

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    window.scrollTo(0, 0);
    // Simuler un faux chargement de 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    // Nettoyage du timer lors du démontage du composant
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="homepage-container">
      <Intro />
      <div className='profil-container'>
        <motion.div 
          className='profil-container-img'
          initial={{x:-50, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:2.5, ease:"easeOut"}}
        >
          <img 
            src={HomePicture}
            alt="Barba Ruiva en concert"
          />
        </motion.div>
    
        <div className='profil-subtitle'>
          {"Cours de guitare sur mesure avec exercices techniques et jeu en duo".split(" ").map((el, i) => (
            <motion.h2
              initial={{ opacity: 0, rotateX: 90, y: 20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{
                duration: 0.35,
                delay: i / 10
              }}
              key={i}
            >
              {el}{" "}
            </motion.h2>
          ))}
          <Suspense fallback={<div>Loading 3D models...</div>}>
            <motion.div className='profil-3dmodel'
              initial={{opacity:0}}
              whileInView={{opacity:1}}
              transition={{duration:2.5, ease:"easeOut"}}
            >
              <Microphone className="microphone-box"/>
              <Note className="note-box"/>
              <Headphones className="headphones-box"/>
              <PlayButton className="playbutton-box"/>
            </motion.div>
          </Suspense>
        </div>
      </div>

      <div className='presentation-container'>
        <div className='presentation-title'>  
          {"A propos de moi".split(" ").map((el, i) => (
            <motion.h3
              initial={{ opacity: 0, rotateX: 90, y: 20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: i / 10
              }}
              key={i}
            >
              {el}{" "}
            </motion.h3>
          ))}
        </div>

        <div className='card presentation-sub'>
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect
              rx="10"
              ry="10"
              className="line"
              height="100%"
              width="100%"
              strokeLinejoin="round"
            />
          </svg>
          <div className="inner-card">
            <p>Guitariste et Bassiste. J’ai commencé il y a 10 ans et aujourd’hui je prépare une licence en musicologie ainsi qu’un Diplôme d'Etude Musicale du conservatoire dans le département JAZZ.</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading 3D models...</div>}>
        <div className="presentation-model3d">
          <Woofer className="woofer-box"/>
          <Radio className="radio-box"/>
        </div>
      </Suspense>

      <div className='presta-container'>
        <img 
          src={PrestaPicture} 
          alt="Barba Ruiva accoudé à une table" 
          draggable='false' 
          style={{
            transition: 'transform 0.5s ease-out',
            willChange: 'transform',
          }}
        />

        <p>Cours de guitare à Andlau et ses alentours avec un tarif de 15€ / heure</p>
        <a href="/prestation"><button>En savoir plus</button></a>
        <Suspense fallback={<div>Loading 3D models...</div>}>
          <div className="presta-model3d">
            <Note className="presta-note-box"/>
            <Microphone className="presta-microphone-box"/>
          </div>
        </Suspense>
      </div>

      <div className='contact-container'>
        <span>Contactez moi</span>
      </div>

      <Suspense fallback={<div>Loading 3D models...</div>}>
        <Phone />
      </Suspense>
    </div>
  );
};

export default Homepage;
