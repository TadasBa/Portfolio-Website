import { ArrowLeft, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { SectionContainer } from "../components/layout/SectionContainer";
import { ButtonLink } from "../components/ui/ButtonLink";
import { ContentCard } from "../components/ui/ContentCard";
import { EmptyState } from "../components/ui/EmptyState";
import { Tag } from "../components/ui/Tag";
import { getBlogPostBySlug } from "../content/blog/posts";
import {
  getBlogPostRouteMetadata,
  notFoundMetadata,
} from "../content/routeMetadata";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./DetailPage.module.scss";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useDocumentMeta(
    post ? getBlogPostRouteMetadata(post.slug) : notFoundMetadata,
  );

  if (!post) {
    return (
      <SectionContainer className={styles.page}>
        <EmptyState
          actionLabel="Back to blog"
          actionTo="/blog"
          description="The requested blog post does not exist or the slug has changed."
          icon={<BookOpen />}
          title="Blog post not found"
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer className={styles.page}>
      <ButtonLink className={styles.back} to="/blog" variant="secondary">
        <ArrowLeft />
        Back to blog
      </ButtonLink>

      <article className={`${styles.article} ${styles.articleNarrow}`}>
        <header>
          <p className={styles.kicker}>Blog</p>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <ContentCard className={styles.markdownCard}>
          <div className={styles.markdown}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </ContentCard>
      </article>
    </SectionContainer>
  );
}
