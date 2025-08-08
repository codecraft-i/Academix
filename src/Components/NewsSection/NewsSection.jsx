// src/Components/NewsSection/NewsSection.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NewsSection.css";

/* — Fallback texts — */
const FALLBACK_CATEGORY = "StudyCare";
const ERROR_MSG         = "Error loading news.";

export default function NewsSection() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  /* ------ Fetch news -------- */
  const fetchNews = useCallback(async () => {
    try {
      const { data } = await axios.get("http://45.138.159.137/api/blog/");
      // Optionally keep only popular posts: .filter(p => p.is_popular)
      setPosts((data?.results || []).slice(0, 6)); // first 6 posts
    } catch (err) {
      console.error(err);
      setError(ERROR_MSG);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  /* ------ UI states -------- */
  if (loading) return <p className="news-loader">Loading…</p>;
  if (error)   return <p className="news-error">{error}</p>;

  return (
    <section className="news-section">
      {/* --- Header --- */}
      <header className="news-header">
        <div>
          <h2 className="news-title-heading">Education News</h2>
          <p className="news-subtitle">
            Effective teaching resources and strategies for modern educators
          </p>
        </div>
      </header>

      {/* --- Grid --- */}
      <div className="news-grid">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blogs/${post.slug}`} className="news-card">
            <img
              src={post.cover_image || "/images/news-placeholder.jpg"}
              alt={post.title}
              className="news-thumb"
              loading="lazy"
            />

            <div className="news-content">
              {/* Category — use fallback if the backend value is missing */}
              <span className="news-category">
                {post.category || FALLBACK_CATEGORY}
              </span>

              <h3 className="news-card-title">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* --- Footer button --- */}
      <div className="news-footer">
        <Link to="/blogs" className="news-all-btn">
          View all
        </Link>
      </div>
    </section>
  );
}