// src/Components/Intro/Intro.jsx
import React, { useCallback, useEffect, useState } from "react";
import "./intro.css";
import {
  FaPlaneDeparture,
  FaUniversity,
  FaHandshake,
  FaAward,
} from "react-icons/fa";
import { FiArrowDownCircle } from "react-icons/fi";
import Header from "../Header/Header";

export default function Intro() {
  /* Smooth-scroll */
  const handleScroll = useCallback(() => {
    const next = document.querySelector("[data-intro-next]");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* Rotating tagline */
  const phrases = [
    "Opening your pathway to study abroad",
    "Scholarship and grant advice",
    "Visa and flights — all arranged",
    "24/7 academic support",
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % phrases.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="intro">
      <Header />

      {/* Decorative blobs */}
      <div className="blob blob--one" />
      <div className="blob blob--two" />

      <div className="intro__content">
        <h1 className="intro__title">
          <span className="intro__word intro__word--accent">ACADEMIX</span>
          <span className="intro__word">CONSULTING</span>
        </h1>

        <p key={idx} className="intro__tagline fade">
          {phrases[idx]}
        </p>

        {/* ------------- Glass-card highlights ------------- */}
        <ul className="intro__highlights">
          <li className="card">
            <FaPlaneDeparture className="intro__icon" />
            We arrange visa and flights
          </li>
          <li className="card">
            <FaUniversity className="intro__icon" />
            500<span className="plus">+</span> partner universities
          </li>
          <li className="card">
            <FaHandshake className="intro__icon" />
            24/7 support
          </li>
          <li className="card">
            <FaAward className="intro__icon" />
            Grant &amp; scholarship guidance
          </li>
        </ul>

        <button className="intro__arrow" onClick={handleScroll}>
          <FiArrowDownCircle className="intro__arrowIcon" />
        </button>
      </div>
    </section>
  );
}