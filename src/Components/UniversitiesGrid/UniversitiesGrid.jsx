// src/Components/UniversitiesGrid/UniversitiesGrid.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "./UniversitiesGrid.css";

/* --- Helper: simple slugify --- */
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces → dashes
    .replace(/[^\w-]/g, "");     // remove all non-word chars

export default function UniversitiesGrid() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  /** Fetch only “top” universities from the backend */
  const fetchUniversities = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/site/api/universities/"
      );
      /*  API response shape: { count: <number>, data: [...] }  */
      const topUnis = (data?.data || []).filter((u) => u.is_top);
      setUniversities(topUnis);
    } catch (err) {
      setError("Error loading data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  /* -------------- Render -------------- */
  if (loading) return <p className="uni-loader">Loading…</p>;
  if (error)   return <p className="uni-error">{error}</p>;

  return (
    <section className="uni-wrapperUP">
      {/* --- Section header --- */}
      <div id="statsHeadTit">
        <div>
          <strong>Our International Partner Universities</strong>
          <span>
            Unlock your path to the world’s most prestigious universities! <br />
            Join our events and take the first step today.
          </span>
        </div>
      </div>

      {/* --- Grid --- */}
      <div className="uni-gridUP dotted-bgUP">
        {universities.map((u) => (
          <Link
            key={u.id}
            to={`/universities/university/${slugify(u.name)}`}
            className="uni-card"
          >
            <img
              src={u.image || "/images/uni-placeholder.jpg"}
              alt={u.name}
              className="uni-img"
              loading="lazy"
            />

            {/* Global ranking (QS, THE, …) */}
            {u.ranking && <span className="uni-rank">#{u.ranking}</span>}

            <div className="uni-info">
              <h3>{u.name}</h3>
            </div>

            <span className="uni-country">
              <FaMapMarkerAlt /> {u.country?.name}
            </span>
          </Link>
        ))}
      </div>

      {/* --- “View all” button --- */}
      <Link className="uni-btn" to="/universities">
        View all
      </Link>
    </section>
  );
}