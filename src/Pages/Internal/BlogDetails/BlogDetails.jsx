// src/pages/BlogDetails/BlogDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import "./BlogDetails.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import BackgroundGrid from "../Contact/BackgroundGrid";

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`blog/${slug}/`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, [slug]);

  if (!post) return <p className="single__loading">Yuklanmoqda...</p>;

  return (
    <div>
        <BackgroundGrid />
        <article className="single">
        <Header />
        <header className="single__header" style={{ marginTop: "100px" }}>
            <Link to="/blogs" className="single__back" style={{ display: "flex", justifyContent: "flex-start", padding: "10px 0", transform: "translateX(-80px)" }}>
                ← Ortga
            </Link>
            <h1 className="single__title">{post.title}</h1>
            <time className="single__date">
            {new Date(post.created_at).toLocaleDateString()}
            </time>
            <img
            src={post.cover_image}
            alt={post.title}
            className="single__cover"
            />
        </header>

        <section className="single__body">
            {post.sections.map((sec) => (
            <div key={sec.id} className="single__section">
                <h2>{sec.heading}</h2>
                {/* CKEditor RichText HTML’ni ko‘rsatish */}
                <div
                dangerouslySetInnerHTML={{ __html: sec.body }}
                className="single__content"
                />
            </div>
            ))}
        </section>
        </article>
        <Footer />
    </div>
  );
}
