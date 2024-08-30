import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return(
    <footer>
        <div className="footer-container">
            <div className="footer-left">
                <ul>
                    <li><Link to = '/mentions-legales'>Mentions Légales</Link></li>
                    <li>Copyright</li>
                    <li>Designé et codé par Alexandre Augé</li>
                </ul>
            </div>
            <div className="footer-right">
                <ul>
                <li><Link to ='/'>Accueil</Link></li>
                    <li><Link to='/prestation'>Prestation</Link></li>
                    <li><Link to ='/contact'>Contact</Link></li>
                </ul>
            </div>
            </div>

    </footer>
    );
}

export default Footer;