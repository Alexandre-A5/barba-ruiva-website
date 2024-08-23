import React, { useEffect, useRef } from 'react';
import Cube from '../../Components/3DItems/Cube';
import Sphere from '../../Components/3DItems/Sphere';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Homepage.css';
import HomePicture from '../../assets/PhotoStan.jpeg';
import PrestaPicture from '../../assets/PhotoStan2.jpeg';
import Intro from '../../Components/Intro/Intro';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';


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
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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

      <Sphere 
        size={3} 
        color={0xffffff} 
        position={{ x: 0, y: 0, z: 0 }} 
        className='profil-sphere'
      />

      <Cube
        size={1.5} color={0xFE5F00} 
        position={{ x: 0, y: 0, z: 0 }} 
        className='profil-cube'
      />

      <div className='profil-container'>
        <motion.div 
          className='profil-container-img'
          initial={{x:-90, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:2.5, ease:"easeOut"}}
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            transform,
            x:0,
          }}
        >
          <img 
            data-aos="fade-right"
            src={HomePicture}
            alt="Barba Ruiva en concert"
          />
        </motion.div>

        <Sphere 
          size={3} color={0xffffff} 
          position={{ x: 0, y: 0, z: 0 }} 
          className='profil-sphere2'
        />

        <Cube
          size={1.5} color={0xFE5F00} 
          position={{ x: 0, y: 0, z: 0 }} 
          className='profil-cube2'
        />

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

      <Sphere 
        size={1} 
        color={0xffffff} 
        position={{ x: 0, y: 0, z: 0 }} 
        className='presentation-sphere'
      />
      
      <div className='presta-container'>
        <img 
          src={PrestaPicture} 
          alt="Barba Ruiva" 
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

      <Cube 
        size={3} 
        color={0xffffff}  
        position={{ x: 0, y: 0, z: 0 }} 
        className='homepage-cube' 
      />
    </div>
  );
};

export default Homepage;
