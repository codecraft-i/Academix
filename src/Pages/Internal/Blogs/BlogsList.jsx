// src/pages/Blogs/BlogsList.jsx
import { useEffect, useState } from "react";
import { api } from "../../../api";
import BlogCard from "../../../Components/BlogCard/BlogCard";
import "./BlogsList.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import BackgroundGrid from "../Contact/BackgroundGrid";

export default function BlogsList() {
  const [posts, setPosts]       = useState([]);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6; // cards per page

  /* Fetch blog posts */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get(`blog/?page=${page}`);
        setPosts(res.data.results);
        setTotalPages(Math.ceil(res.data.count / pageSize));
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, [page]);

  return (
    <div>
      <BackgroundGrid />
      <Header />

      {/* Page hero */}
      <div id="statsHeadTit" style={{ marginTop: "100px" }}>
        <div>
          <strong>Our Latest Education Posts</strong>
        </div>
      </div>

      {/* Main content */}
      <main className="blogs">
        <h1 className="blogs__heading">All&nbsp;Posts</h1>

        <div className="blogs__grid">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </main>

      <Footer />
    </div>
  );
}

/* --- Pagination component --- */
function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination">
      <button
        className="pagination__btn"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`pagination__btn ${
            p === page ? "pagination__btn--active" : ""
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="pagination__btn"
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
      >
        →
      </button>
    </nav>
  );
}