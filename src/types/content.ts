export type SocialLink = {
  href: string;
  label: string;
  value: string;
};

export type WorkEntry = {
  domain: string;
  shot: string;
  slug: string;
  summary: string;
  tag: string;
  title: string;
  url: string;
  year: string;
};

export type BlogPostEntry = {
  content: string;
  dateLabel: string;
  featured?: boolean;
  publishedAt: string;
  readTime: string;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
};
