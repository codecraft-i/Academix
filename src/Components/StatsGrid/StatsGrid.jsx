// src/Components/StatsGrid/StatsGrid.jsx
import React from "react";
import "./StatsGrid.css";

export default function StatsGrid() {
  // Feel free to replace image paths ↓
  const items = [
    {
      type: "image",
      src: "/grid/g3.webp",
      alt: "Students walking on campus",
    },
    {
      type: "stat",
      label: "Exhibition participants",
      value: "400+",
      fancy: true,
    },
    {
      type: "image",
      src: "/grid/g1.webp",
      alt: "Students walking on campus",
    },
    {
      type: "stat",
      label: "Study destinations",
      value: "5+",
    },
    {
      type: "stat",
      label: "Successful students",
      value: "20,000+",
    },
    {
      type: "image",
      src: "/grid/g2.webp",
      alt: "Graduate students",
    },
    {
      type: "stat",
      label: "Education fairs",
      value: "40+",
      fancy: true,
    },
    {
      type: "image",
      src: "/grid/g1.webp",
      alt: "Conference hall",
    },
  ];

  return (
    <section className="stats-wrapper">
      {/* --- Section header --- */}
      <div id="statsHeadTit">
        <div>
          <strong>Milestones Achieved Through Our Clients’ Trust</strong>
          <span>
            Student success and well-being are always our top priorities.
            The numbers below showcase the breadth and quality of the
            services we deliver.
          </span>
        </div>
      </div>

      {/* --- Grid --- */}
      <div className="stats-grid">
        {items.map((item, i) =>
          item.type === "stat" ? (
            <article
              className={`card stat-card ${item.fancy ? "fancy" : ""}`}
              key={i}
            >
              <h3 className="stat-label">{item.label}</h3>
              <p className="stat-value">{item.value}</p>
            </article>
          ) : (
            <figure className="card image-card" key={i}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          )
        )}
      </div>
    </section>
  );
}