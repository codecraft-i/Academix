import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./university.css";
import InquiryForm from "../../../Components/InquiryForm/InquiryForm";
import TestimonialCarousel2 from "../../../Components/TestimonialCarousel2/TestimonialCarousel2";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import BackgroundGrid from "../Contact/BackgroundGrid";

const University = () => {
  const { university_name } = useParams();
  const [uni, setUni] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/site/api/universities/")
      .then((r) => {
        const found = r.data.data.find((u) => u.name === university_name);
        setUni(found);
      })
      .catch((e) => console.error("Fetch error:", e));
  }, [university_name]);

  if (!uni) return <div className="uni-loading">Loading…</div>;

  return (
    <div>
      <BackgroundGrid />
      <Header />
      <section className="uni-wrapper">
      {/* Country badge */}

      {/* Title */}
      <div style={{ marginTop: "100px" }}>
        <span style={{ padding: "5px 10px", background: "rgba(0, 0, 0, 0.1)", borderRadius: "20px" }}>{uni.country.name}</span>
        <h1 style={{ marginTop: "10px" }} className="uni-title">{uni.name}</h1>
      </div>

      {/* Campus image */}
      <div className="uni-img-box">
        <img src={uni.image} alt={`${uni.name} campus`} />
      </div>

      {/* Description */}
      <p className="uni-desc">{uni.description}</p>

      {/* Extra paragraphs (optional) */}
      {uni.extra_paragraphs?.length > 0 && (
        <div className="uni-desc">
          {uni.extra_paragraphs.map((p, i) => (
            <p key={i}>{p.text}</p>
          ))}
        </div>
      )}
    </section>
    <div className="uniDetBbox" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ maxWidth: "700px", width: "100%", padding: "0 10px" }}>
          {/* YouTube video */}
          {uni.yt_video_link && (
          <div className="uni-video">
            <h2>Campus Tour</h2>
            <iframe
              src={uni.yt_video_link.replace("youtu.be/", "www.youtube.com/embed/")}
              title="Campus Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        )}

        {/* Details button */}
        <a
          href={uni.details_url}
          target="_blank"
          rel="noopener noreferrer"
          className="uni-btn"
        >
          More Details
        </a>
        </div>
        <div>
          <InquiryForm />
        </div>
      </div>
    <Footer />
    </div>
  );
};

export default University;
