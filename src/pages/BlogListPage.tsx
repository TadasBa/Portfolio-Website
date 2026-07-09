import { Link } from "react-router-dom";
import { blogPostsByDate } from "../content/blog/posts";
import { requireRouteMetadata } from "../content/routeMetadata";
import { StageRoom } from "../features/stage/StageRoom";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./BlogList.module.scss";

export function BlogListPage() {
  useDocumentMeta(requireRouteMetadata("/blog"));

  return (
    <>
      <StageRoom floor={false} />
      <header className={styles.topbar}>
        <Link className={styles.home} to="/#blog">
          ← Back
        </Link>
      </header>
      <main className={styles.page} id="main">
        <div className={styles.head}>
          <h1 className={styles.title}>Blog</h1>
        </div>
        <ol className={styles.list}>
          {blogPostsByDate.map((post) => (
            <li key={post.slug}>
              <Link className={styles.item} to={`/blog/${post.slug}`}>
                <span className={styles.itemMeta}>
                  {post.dateLabel} / {post.readTime}
                </span>
                <h2 className={styles.itemTitle}>{post.title}</h2>
                <p className={styles.itemSummary}>{post.summary}</p>
                <span className={styles.itemTags}>
                  {post.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
