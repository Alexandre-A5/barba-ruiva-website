import React, {useEffect} from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Intro.css';

const Intro = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Durée de l'animation en millisecondes
          once: true,     // Animation ne se joue qu'une seule fois
        });
      }, []);
    return(
        <>
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
      </>
    )

}

export default Intro;