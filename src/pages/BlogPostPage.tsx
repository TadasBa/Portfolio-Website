import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug } from "../content/blog/posts";
import {
  getBlogPostRouteMetadata,
  notFoundMetadata,
} from "../content/routeMetadata";
import { StageRoom } from "../features/stage/StageRoom";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./Article.module.scss";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useDocumentMeta(
    post ? getBlogPostRouteMetadata(post.slug) : notFoundMetadata,
  );

  if (!post) {
    return (
      <>
        <StageRoom floor={false} />
        <main className={styles.page} id="main">
          <div className={styles.notFound}>
            <h1>Not written yet.</h1>
            <p>That post doesn&apos;t exist or the link has changed.</p>
            <Link to="/blog">← All posts</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <StageRoom floor={false} />
      <header className={styles.topbar}>
        <Link className={styles.home} to="/blog">
          ← All posts
        </Link>
      </header>
      <main className={styles.page} id="main">
        <article className={styles.framed}>
          <div className={styles.framedInner}>
            <p className={styles.kicker}>Blog</p>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>{post.dateLabel}</span>
              <span aria-hidden="true">/</span>
              <span>{post.readTime}</span>
            </div>
            <div className={styles.body}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
