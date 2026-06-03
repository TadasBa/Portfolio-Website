import type { BlogPostEntry } from "../../types/content";
import { blogPostContent } from "./postContent";
import softwareEngineeringAtVuContent from "./software-engineering-at-vilnius-university.md?raw";

const postBodyBySlug: Record<string, string> = {
  "software-engineering-at-vilnius-university": softwareEngineeringAtVuContent,
};

export const blogPosts: BlogPostEntry[] = blogPostContent.map((post) => ({
  ...post,
  content: postBodyBySlug[post.slug],
}));

export const blogPostsByDate = [...blogPosts].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
