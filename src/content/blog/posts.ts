import type { BlogPostEntry } from "../../types/content";
import bakeryContent from "./a-bakery-taught-me-about-websites.md?raw";
import { blogPostContent } from "./postContent";
import rebuiltContent from "./rebuilt-this-site-14-times.md?raw";
import softwareEngineeringAtVuContent from "./software-engineering-at-vilnius-university.md?raw";

const postBodyBySlug: Record<string, string> = {
  "rebuilt-this-site-14-times": rebuiltContent,
  "a-bakery-taught-me-about-websites": bakeryContent,
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
