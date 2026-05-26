export type SocialLink = {
  href: string;
  label: string;
  value: string;
};

export type SkillGroup = {
  description?: string;
  skills: string[];
  title: string;
};

export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectMedia = {
  alt: string;
  caption: string;
  src: string;
};

export type ProjectEntry = {
  dateLabel: string;
  featured?: boolean;
  gallery?: ProjectMedia[];
  highlights: string[];
  links?: ProjectLink[];
  outcome: string;
  problem: string;
  publishedAt: string;
  slug: string;
  solution: string;
  summary: string;
  tags: string[];
  technologies: string[];
  title: string;
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
