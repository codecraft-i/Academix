import React from "react";
import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" style={{marginTop: "50px"}}>
      {/* --- TOP SECTION ------------------------------------------------ */}
      <div className="footer__grid">
        {/* Left — logo, description, address */}
        <div className="footer__col footer__brand">
          <h2 className="logo"><img src="/logo-fw.png" alt="Academix" style={{ width: "auto", height: "50px", backgroundSize: "cover" }} /></h2>
          <p className="footer__text">
            Talaba muvaffaqiyati va farovonligi — eng oliy vazifamiz. Bu yo‘ldagi yutuqlarimizni sizga mamnuniyat bilan taqdim etamiz.
          </p>
          <address className="footer__address">
            
          </address>
        </div>

        {/* Middle — navigation 1 */}
        <ul className="footer__col footer__nav">
          <li><NavLink to='/universities'>Study Abroad</NavLink></li>
          <li><NavLink to='/events'>Events</NavLink></li>
          <li><NavLink to='/blogs'>Blog</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
        </ul>

        {/* Right — navigation 2 + contacts */}
        <div className="footer__col footer__extra">
          <ul className="footer__links">
            <a href=""></a>
          </ul>

          <a className="footer__phone" href="tel:+998774183940">
            +998 77 418 39 40
          </a>
          <a className="footer__phone" href="tel:+998774173940">
            +998 77 417 39 40
          </a>
        </div>
      </div>

      {/* --- DIVIDER ---------------------------------------------------- */}
      <hr className="footer__divider" />

      {/* --- BOTTOM SECTION -------------------------------------------- */}
      <div className="footer__bottom">
        <p>© 2025 StudyCare. All rights reserved</p>

        <div className="footer__social">
          <a href="https://www.instagram.com/academix_world/" target="_blank" style={{ color: "#fff", }} aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://t.me/academixworld" target="_blank" style={{ color: "#fff", }} aria-label="Facebook">
            <FaTelegram />
          </a>
        </div>
      </div>
    </footer>
  );
}
