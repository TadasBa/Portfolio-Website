import type { BlogPostEntry } from "../../types/content";

export type BlogPostContentEntry = Omit<BlogPostEntry, "content">;

export const blogPostContent: BlogPostContentEntry[];
