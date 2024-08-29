import React, { useEffect, useRef } from 'react';
import Cube from '../../Components/3DItems/Cube';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Homepage.css';
import HomePicture from '../../assets/PhotoStan.jpeg';
import PrestaPicture from '../../assets/PhotoStan2.jpeg';
import Intro from '../../Components/Intro/Intro';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import Phone from '../../Components/Phone';
import Microphone from '../../Components/Microphone';
import Note from '../../Components/Note';
import Headphones from '../../Components/Headphones';
import PlayButton from '../../Components/Playbutton';
import Woofer from '../../Components/Woofer';
import Radio from '../../Components/Radio';

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const Homepage = () => {
  const h2text = "Cours de guitare sur mesure avec exercices techniques et jeu en duo".split(" ");
  const aProposText = "A propos de moi".split(" ");

  const ref = useRef(null);



  const prestaImgRef = useRef(null);

  const handlePrestaMouseMove = throttle((e) => {
    if (!prestaImgRef.current) return;

    const rect = prestaImgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 5;
    const midY = rect.height / 5;

    const offsetX = ((x - midX) / midX) * 5;
    const offsetY = ((y - midY) / midY) * 5;

    prestaImgRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, 20);

  const handlePrestaMouseLeave = () => {
    if (prestaImgRef.current) {
      prestaImgRef.current.style.transform = 'translate(0px, 0px)';
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <div className="homepage-container">
      <Intro/>
      <div className='profil-container'>
        <motion.div 
          className='profil-container-img'
          initial={{x:-50, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:2.5, ease:"easeOut"}}
          ref={ref}
        >
          <img 
            src={HomePicture}
            alt="Barba Ruiva en concert"
          />
        </motion.div>
    
      <div className='profil-subtitle'>
          {h2text.map((el, i) => (
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
                <motion.div className='profil-3dmodel'
                initial={{opacity:0}}
                whileInView={{opacity:1}}
                transition={{duration:2.5, ease:"easeOut"}}
                ref={ref}>
                  <Microphone className="microphone-box"/>
                  <Note className="note-box"/>
                  <Headphones className="headphones-box"/>
                  <PlayButton className="playbutton-box"/>
                </motion.div>
        </div>
      </div>



      <div className='presentation-container'>
        <div className='presentation-title'>  
          {aProposText.map((el, i) => (
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
      <div className="presentation-model3d">
        <Woofer className="woofer-box"/>
        <Radio className="radio-box"/>
      </div>

     
      
      <div className='presta-container'>
        <img 
          src={PrestaPicture} 
          alt="Barba Ruiva accoudé à une table" 
          draggable='false' 
          ref={prestaImgRef}
          onMouseMove={handlePrestaMouseMove} // Appliquer l'événement ici
          onMouseLeave={handlePrestaMouseLeave} // Appliquer l'événement ici
          style={{
            transition: 'transform 0.5s ease-out',
            willChange: 'transform',
          }}
        />

        <p>Cours de guitare à Andlau et ses alentours avec un tarif de 15€ / heure</p>
        <a href="/prestation"><button>En savoir plus</button></a>
      </div>

      <div className='contact-container'>
        <span>Contactez moi</span>
      </div>

      <Phone/>
    </div>
  );
};

export default Homepage;
