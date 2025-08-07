import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./TestimonialsCarousel.css";

const slides = [
  {
    quote: "Acedemix made my dream of studying abroad a reality! From helping me choose the ideal university to guiding me through the visa application process, their team was by my side every step of the way. Thanks to their unwavering support, I’m now thriving at Vistula University.",
    name: "Farruh Sobirov",
    university: "Vistula University",
    logo: "/universities/img7.webp",
  },
  {
    quote: "Academix transformed my aspiration to study overseas into a tangible achievement! Their expert advisors walked me through everything—from narrowing down the best-fit university to navigating the visa paperwork—and now I’m flourishing at Istanbul Aydin University thanks to their exceptional guidance.",
    name: "Sharipov Ziyodullokhon",
    university: "Istanbul Aydin University",
    logo: "/universities/img10.png",
  }
];

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef(null);

  const prev = () => setIdx((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setIdx((p) => (p + 1) % slides.length);

  /* --- Avtomatik aylantirish --- */
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000); // 6 s
    return () => clearInterval(intervalRef.current);
  }, []);

  /* Tugma bosilganda intervalni tiklash */
  const handleManualNav = (cb) => {
    clearInterval(intervalRef.current);
    cb();
    intervalRef.current = setInterval(next, 6000);
  };

  const { quote, name, university, logo } = slides[idx];

  /* --- Matnni 200 belgigacha kesib, "…" qo‘shish --- */
  const displayQuote =
    quote.length > 200 ? quote.slice(0, 200).trimEnd() + "…" : quote;

  return (
    <section className="testimonial-carousel" style={{padding: "0 40px"}}>
      {/* Chap blok — matn */}
      <div className="carousel-left">
        <p className="quote">{displayQuote}</p>

        <hr className="divider" />

        <div className="author">
          <span className="author-name">{name}</span>
          <span className="author-uni">{university}</span>
        </div>

        <div className="nav-btns">
          <button className="nav-btn" onClick={() => handleManualNav(prev)}>
            <FiChevronLeft />
          </button>
          <button className="nav-btn" onClick={() => handleManualNav(next)}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* O‘ng blok — logo */}
      <div className="carousel-right">
        <img src={logo} alt={`${university} logo`} className="logo" />

        <div className="overlay">
          <span className="overlay-name">{name}</span>
          <span className="overlay-uni">{university}</span>
        </div>
      </div>
    </section>
  );
}