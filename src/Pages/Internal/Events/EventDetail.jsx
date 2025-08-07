// src/Pages/Internal/Events/EventDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvent } from "../../../api/events";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import "./pages.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import InquiryForm from "../../../Components/InquiryForm/InquiryForm";
import BackgroundGrid from "../Contact/BackgroundGrid";

export default function EventDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [ev, setEv] = useState(null);

  /* Fetch single event by ID */
  useEffect(() => {
    getEvent(id).then(setEv);
  }, [id]);

  if (!ev) return <p className="events__state">Loading…</p>;

  return (
    <div>
      <BackgroundGrid />
      <Header />

      <div className="eventDetailsSCBox">
        <div>
          <section className="eventDetail" style={{ marginTop: "80px" }}>
            <button onClick={() => navigate(-1)} className="backBtn">
              <FiArrowLeft /> Back
            </button>

            <img
              src={ev.image_url || "/images/default-event.jpg"}
              alt={ev.title}
            />

            <h1>{ev.title}</h1>

            <div className="eventDetail__meta">
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FiCalendar /> {ev.date}
              </span>
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FiClock /> {ev.time_range}
              </span>
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FiMapPin /> <a style={{ textDecoration: "none", color: "#000" }} href={ev.location || ev.venue} target="_blank">Address</a>
              </span>
            </div>

            <p className="eventDetail__desc">{ev.description}</p>

            {/* Add more fields below if needed */}
          </section>
        </div>

        <div style={{ marginTop: "115px" }}>
          <InquiryForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}