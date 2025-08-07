// src/Pages/Internal/Events/EventsPage.jsx
import { useEffect, useState } from "react";
import { getEvents } from "../../../api/events";
import EventCard from "../../../Components/EventCard/EventCard";
import "./pages.css";
import BackgroundGrid from "../Contact/BackgroundGrid";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

const TABS = [
  { key: "PLANNED",   label: "Upcoming Events" },
  { key: "COMPLETED", label: "Past Events" },
];

export default function EventsPage() {
  const [status, setStatus]   = useState("PLANNED");
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(false);

  /* Fetch events by status */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setEvents(await getEvents({ status }));
      } finally {
        setLoading(false);
      }
    })();
  }, [status]);

  return (
    <div>
      <section className="events">
        <BackgroundGrid />
        <Header />

        {/* Hero area */}
        <div className="eventFDataBox" style={{ marginTop: "100px" }}>
          <div id="statsHeadTit">
            <div>
              <strong>Masterclasses &amp; Events</strong>
            </div>
          </div>
          <div className="eventFDataBoxImg">
            <img src="/docfImage.jpeg" alt="Events banner" />
          </div>
        </div>

        {/* Tabs */}
        <div className="events__tabs" style={{ marginTop: "15px" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`events__tab ${t.key === status ? "is-active" : ""}`}
              onClick={() => setStatus(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {loading ? (
          <p className="events__state">Loading…</p>
        ) : events.length ? (
          <div className="events__grid">
            {events.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        ) : (
          <p className="events__state">No events found</p>
        )}
      </section>

      <Footer />
    </div>
  );
}