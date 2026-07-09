import type { BlogPostEntry } from "../../types/content";
import placeholderOneContent from "./placeholder-1.md?raw";
import placeholderTwoContent from "./placeholder-2.md?raw";
import placeholderThreeContent from "./placeholder-3.md?raw";
import placeholderFourContent from "./placeholder-4.md?raw";
import { blogPostContent } from "./postContent";

const postBodyBySlug: Record<string, string> = {
  "placeholder-1": placeholderOneContent,
  "placeholder-2": placeholderTwoContent,
  "placeholder-3": placeholderThreeContent,
  "placeholder-4": placeholderFourContent,
};

export const blogPosts: BlogPostEntry[] = blogPostContent.map((post) => ({
  ...post,
  content: postBodyBySlug[post.slug],
}));

export const blogPostsByDate = [...blogPosts].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

/** The most recent posts, for the compact home-page preview. */
export const featuredBlogPosts = blogPostsByDate.slice(0, 3);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
