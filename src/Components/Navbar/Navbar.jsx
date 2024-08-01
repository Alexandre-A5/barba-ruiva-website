import React, { useEffect } from "react";
import './Navbar.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from "react-router-dom";

const Navbar = () => {
    useEffect(() => {
        AOS.init({
          duration: 2000, // Durée de l'animation en millisecondes
          once: true,     // Animation ne se joue qu'une seule fois
        });
      }, []);
    return(
            <nav data-aos="fade-in">
                <ul>
                    <li><Link to ='/'>Accueil</Link></li>
                    <li><Link to='/prestation'>Prestation</Link></li>
                    <li><Link to ='/contact'>Contact</Link></li>
                </ul>
            </nav>
    )
}

export default Navbar;