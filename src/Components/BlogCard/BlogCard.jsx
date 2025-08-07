// src/components/BlogCard/BlogCard.jsx
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ post }) {
  return (
    <div className="blogCard">
      <Link to={`/blogs/${post.slug}`} className="blogCard__link">
        <img
          src={post.cover_image}
          alt={post.title}
          className="blogCard__img"
        />

        <div className="blogCard__content">
          <span className="blogCard__badge">Academix</span>
          <h3 className="blogCard__title">{post.title}</h3>
        </div>
      </Link>
    </div>
  );
}
