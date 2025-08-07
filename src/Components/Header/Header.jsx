// src/Components/Header/Header.jsx
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

import logo_e from "/logo-e.png";
import logo_m from "/logo.png";
import logo_w from "/logo-w.png";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Glass effect on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock page scroll while the overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  /* Change logo by viewport / route */
  const [logo, setLogo] = useState(logo_m);
  useEffect(() => {
    const updateLogo = () => {
      const width = window.innerWidth;
      if (width <= 470) {
        setLogo(logo_e);       // ≤470 px → compact logo
      } else if (window.location.pathname === "/universities") {
        setLogo(logo_w);       // universities page → white logo
      } else {
        setLogo(logo_m);       // default
      }
    };
    updateLogo();
    window.addEventListener("resize", updateLogo);
    return () => window.removeEventListener("resize", updateLogo);
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className={`site-header${scrolled ? " glass" : ""}`}
        style={{ padding: "60px 0" }}
      >
        <div className="header-inner">
          {/* Logo */}
          <NavLink to="/" className="logo" aria-label="Home">
            <img
              src={logo}
              alt="Academix Logo"
              className={`logo-img ${logo === logo_e ? "logo-small" : ""}`}
            />
          </NavLink>

          {/* Desktop navigation */}
          <nav className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-nav" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/universities"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-nav" : ""}`
              }
            >
              Study&nbsp;Abroad
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-nav" : ""}`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-nav" : ""}`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-nav" : ""}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* CTA (both desktop & mobile) */}
          <Link
            to="/contact"
            className="cta-btn header-cta"
            style={{ textDecoration: "none" }}
          >
            Get&nbsp;in&nbsp;touch
          </Link>

          {/* Hamburger / Close */}
          <button
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      </header>

      {/* ===== MOBILE OVERLAY ===== */}
      <nav className={`mobile-overlay${open ? " show" : ""}`}>
        <button
          className="overlay-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <FiX size={28} />
        </button>
        <ul className="overlay-list">
          <li>
            <NavLink
              onClick={() => setOpen(false)}
              to="/"
              className={({ isActive }) =>
                `internalOlist ${isActive ? "activeResNav" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setOpen(false)}
              to="/universities"
              className={({ isActive }) =>
                `internalOlist ${isActive ? "activeResNav" : ""}`
              }
            >
              Study&nbsp;Abroad
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setOpen(false)}
              to="/events"
              className={({ isActive }) =>
                `internalOlist ${isActive ? "activeResNav" : ""}`
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setOpen(false)}
              to="/blogs"
              className={({ isActive }) =>
                `internalOlist ${isActive ? "activeResNav" : ""}`
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setOpen(false)}
              to="/contact"
              className={({ isActive }) =>
                `internalOlist ${isActive ? "activeResNav" : ""}`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setOpen(false)}
              to="/contact"
              className="cta-btn full"
            >
              Get&nbsp;in&nbsp;touch
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}