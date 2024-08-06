import React from "react";
import './Footer.css';

const Footer = () => {
    return(
    <footer>
        <div className="footer-container">
            <div className="footer-left">
                <ul>
                    <li>Mentions Légales</li>
                    <li>Copyrigth</li>
                    <li>Designé et codé par Alexandre Augé</li>
                </ul>
            </div>
            <div className="footer-right">
                <ul>
                    <li>Accueil</li>
                    <li>Prestation</li>
                    <li>Contact</li>
                </ul>
            </div>
            </div>

    </footer>
    );
}

export default Footer;