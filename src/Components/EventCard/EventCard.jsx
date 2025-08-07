import "./EventCard.css";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function EventCard({ ev }) {
  return (
    <Link to={`/events/${ev.id}`} className="evCard">
      <img
        src={ev.image_url || "/images/default-event.jpg"}
        alt={ev.title}
        className="evCard__img"
      />

      <h3 className="evCard__title">{ev.title}</h3>

      <div className="evCard__meta">
        <span>
          <FiCalendar />{" "}
          {new Intl.DateTimeFormat("uz-UZ", {
            day: "numeric",
            month: "long",
          }).format(new Date(ev.date))}
        </span>

        <span>
          <FiClock /> {ev.time_range}
        </span>

        <span>
          <FiMapPin /> {ev.venue || ev.location}
        </span>
      </div>
    </Link>
  );
}
