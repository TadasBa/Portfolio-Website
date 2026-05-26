import type { BlogPostEntry } from "../../types/content";
import softwareEngineeringAtVuContent from "./software-engineering-at-vilnius-university.md?raw";

export const blogPosts: BlogPostEntry[] = [
  {
    title: "Software Engineering at Vilnius University",
    slug: "software-engineering-at-vilnius-university",
    summary:
      "A reflection on software engineering studies, early mistakes, thesis work, and what transferred into real development.",
    publishedAt: "2025-06-01",
    dateLabel: "June 2025",
    readTime: "6 min read",
    tags: ["Studies", "Software engineering", "Vilnius University"],
    featured: true,
    content: softwareEngineeringAtVuContent,
  },
];

export const blogPostsByDate = [...blogPosts].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
