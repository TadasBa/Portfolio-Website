import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPostEntry } from "../../types/content";
import styles from "./BlogCard.module.scss";

type BlogCardProps = {
  post: BlogPostEntry;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      aria-label={post.title}
      className={styles.link}
      to={`/blog/${post.slug}`}
    >
      <article className={styles.card}>
        <div>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.summary}>{post.summary}</p>
        </div>
        <div className={styles.meta}>
          <span>
            {post.dateLabel} · {post.readTime}
          </span>
          <ArrowRight aria-hidden="true" />
        </div>
      </article>
    </Link>
  );
}
