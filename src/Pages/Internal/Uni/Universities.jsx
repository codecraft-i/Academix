// src/Pages/Internal/Universities/Universities.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
  FiMapPin,
  FiCheck,
  FiTrash,
} from "react-icons/fi";
import "./Universities.css";
import Intro44 from "../../../Components/Intro44/Intro44";
import Footer from "../../../Components/Footer/Footer";

const API = "http://45.138.159.137/site/api";

/* → Convert any DRF/helper response to a plain array */
const toArray = (data) => {
  if (Array.isArray(data)) return data;                  // [{}, {}]
  if (Array.isArray(data?.results)) return data.results; // paginated
  if (Array.isArray(data?.data)) return data.data;       // {count, data:[…]}
  if (data && typeof data === "object") return Object.values(data);
  return [];
};

export default function Universities() {
  /* STATE */
  const [unis, setUnis]         = useState([]);
  const [countries, setCountries] = useState([]);

  const [activeCountry, setActiveCountry] = useState(null);
  const [activeCity, setActiveCity]       = useState(null);
  const [countryQuery, setCountryQuery]   = useState("");

  /* UI */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen]       = useState(false);
  const [sortKey, setSortKey]         = useState("name");

  /* fetch status */
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  /* FETCH */
  useEffect(() => {
    (async () => {
      try {
        const [{ data: cData }, uRes] = await Promise.all([
          axios.get(`${API}/countries/`),
          axios.get(`${API}/universities/`),
        ]);

        setCountries(toArray(cData));
        setUnis(toArray(uRes.data));
      } catch (err) {
        console.error(err);
        setError("Error fetching data from the server.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* Helper → count universities */
  const uniCountBy = (type, value) =>
    unis.filter((u) => {
      const countryName =
        typeof u.country === "string" ? u.country : u.country?.name ?? "";
      const cityName =
        typeof u.city === "string" ? u.city : u.city?.name ?? "";
      return type === "country" ? countryName === value : cityName === value;
    }).length;

  /* Filter + sort */
  const filtered = useMemo(() => {
    return unis
      .filter((u) => {
        const cName =
          typeof u.country === "string" ? u.country : u.country?.name ?? "";
        const cityName =
          typeof u.city === "string" ? u.city : u.city?.name ?? "";
        return (
          (!activeCountry || activeCountry === cName) &&
          (!activeCity || activeCity === cityName)
        );
      })
      .sort((a, b) => {
        if (sortKey === "ranking") {
          return (a.ranking ?? Infinity) - (b.ranking ?? Infinity);
        }
        return (a.name ?? "").localeCompare(b.name ?? "");
      });
  }, [unis, activeCountry, activeCity, sortKey]);

  const clearFilters = () => {
    setActiveCountry(null);
    setActiveCity(null);
  };

  /* RENDER */
  if (loading) {
    return (
      <div className="uniLoadingWrapper">
        <Intro44 />
        <p className="loadingMsg">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="uniLoadingWrapper">
        <Intro44 />
        <p className="errorMsg">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Intro44 />

      <div className="uniPage" data-intro-next-44>
        {/* ==== SIDEBAR ==== */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <header className="sidebarHead">
            <h1>Filter</h1>
            <button className="closeBtn" onClick={() => setSidebarOpen(false)}>
              <FiX size={22} />
            </button>
          </header>

          {/* Countries */}
          <section>
            <h2>Countries</h2>
            <div className="searchField">
              <FiSearch />
              <input
                placeholder="Search country"
                value={countryQuery}
                onChange={(e) => setCountryQuery(e.target.value)}
              />
            </div>

            <ul className="filterList">
              <li
                key="_all"
                className={!activeCountry ? "activeFilter" : undefined}
                onClick={() => setActiveCountry(null)}
              >
                <span className="label">All</span>
                <span className="count">{unis.length}</span>
              </li>

              {countries
                .filter((c) =>
                  c.name.toLowerCase().includes(countryQuery.toLowerCase())
                )
                .map((c) => (
                  <li
                    key={c.id ?? c.name}
                    className={activeCountry === c.name ? "activeFilter" : ""}
                    onClick={() =>
                      setActiveCountry(
                        activeCountry === c.name ? null : c.name
                      )
                    }
                  >
                    <span className="label">{c.name}</span>
                    <span className="count">
                      {uniCountBy("country", c.name)}
                    </span>
                  </li>
                ))}
            </ul>
          </section>

          {(activeCountry || activeCity) && (
            <button className="clearAll" onClick={clearFilters}>
              <FiTrash /> Clear filter
            </button>
          )}
        </aside>

        {/* ==== MOBILE TOP BAR ==== */}
        <header className="mobileBar">
          <button className="burger" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>

          <div className="sortDrop">
            <button className="dropBtn" onClick={() => setSortOpen((o) => !o)}>
              Sort <FiChevronDown size={16} />
            </button>

            {sortOpen && (
              <ul className="dropMenu">
                <li
                  className={sortKey === "name" ? "active" : ""}
                  onClick={() => {
                    setSortKey("name");
                    setSortOpen(false);
                  }}
                >
                  {sortKey === "name" && <FiCheck size={14} />} Alphabetical
                </li>
                <li
                  className={sortKey === "ranking" ? "active" : ""}
                  onClick={() => {
                    setSortKey("ranking");
                    setSortOpen(false);
                  }}
                >
                  {sortKey === "ranking" && <FiCheck size={14} />} Ranking
                </li>
              </ul>
            )}
          </div>
        </header>

        {/* ==== GRID ==== */}
        <main className="gridArea">
          {filtered.map((u) => {
            const cName =
              typeof u.country === "string" ? u.country : u.country?.name ?? "";
            const key = u.id ?? `${u.name}-${cName}`;
            return (
              <article className="uniCard" key={key}>
                <img src={u.image} alt={u.name} loading="lazy" />
                <div className="overlay">
                  <h3>{u.name}</h3>
                  <span className="countryPill">
                    <FiMapPin size={12} />
                    {cName}
                  </span>
                </div>
                <Link
                  to={`/universities/university/${encodeURIComponent(u.name)}`}
                  className="cardLink"
                />
              </article>
            );
          })}
        </main>
      </div>

      <Footer />
    </div>
  );
}