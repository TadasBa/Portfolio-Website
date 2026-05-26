import { BookOpen } from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { blogPostsByDate } from "../content/blog/posts";
import { BlogCard } from "../features/blog/BlogCard";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./BlogPage.module.scss";

export function BlogPage() {
  useDocumentMeta({
    title: "Blog",
    description:
      "Blog posts from Tadas Baltrunas about software engineering, frontend development, studies, and project work.",
  });

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <SectionHeading
          description="Practical notes on software engineering, frontend development, studies, and project work."
          eyebrow="Blog"
          title="Notes that stay close to the work."
        />
        <div aria-hidden="true" className={styles.books}>
          <span />
          <span />
          <span />
          <span />
          <i />
        </div>
      </div>

      <div className={styles.list}>
        {blogPostsByDate.length > 0 ? (
          blogPostsByDate.map((post, index) => (
            <Reveal delay={index * 0.05} key={post.slug}>
              <BlogCard post={post} />
            </Reveal>
          ))
        ) : (
          <EmptyState
            description="New posts will appear here."
            icon={<BookOpen />}
            title="No blog posts yet"
          />
        )}
      </div>
    </section>
  );
}
