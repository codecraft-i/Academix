// src/Components/Intro44/Intro44.jsx
import React, { useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./Intro44.css";
import Header from "../Header/Header";

export default function Intro44() {
  /* Smooth-scroll to the next section */
  const handleScroll44 = useCallback(() => {
    const next = document.querySelector("[data-intro-next-44]");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="intro44">
      <Header />

      {/* Video background */}
      <video
        className="introVideo44"
        src="/bg.mp4"       /* adjust path if needed */
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark glass overlay */}
      <div className="introGlass44" />

      {/* Center headline */}
      <div className="introOverlay44">
        <h1 className="introTitle44">
          Step into modern education<br />
          with <span className="introBrand44">Academix</span>
        </h1>
      </div>

      {/* Scroll-down arrow */}
      <button
        className="arrowBtn44"
        aria-label="Scroll down"
        onClick={handleScroll44}
      >
        <FiChevronDown className="arrowIcon44" />
      </button>
    </section>
  );
}