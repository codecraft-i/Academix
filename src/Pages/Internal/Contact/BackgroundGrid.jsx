// src/Pages/Internal/Contact/BackgroundGrid.jsx
import React, { useState, useEffect } from "react";
import "./Contact.css"; // shu CSS ichida .background-grid qoidalari bor

export default function BackgroundGrid() {
  const cellSize = 80;      // katak o‘lchami (px)
  const highlightsCount = 6; // bir vaqtda nechta katakcha

  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const cols = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight / cellSize);

    function generateHighlights() {
      const setCoords = new Set();
      while (setCoords.size < highlightsCount) {
        const c = Math.floor(Math.random() * cols);
        const r = Math.floor(Math.random() * rows);
        setCoords.add(`${c},${r}`);
      }
      setHighlights(
        Array.from(setCoords).map((s) => {
          const [c, r] = s.split(",");
          return { col: +c, row: +r };
        })
      );
    }

    generateHighlights();
    const interval = setInterval(generateHighlights, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-grid">
      {highlights.map((h, i) => (
        <div
          key={i}
          className="grid-highlight"
          style={{
            left: `${h.col * cellSize}px`,
            top: `${h.row * cellSize}px`,
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          }}
        />
      ))}
    </div>
  );
}
