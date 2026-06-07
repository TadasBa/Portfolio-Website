export type SocialLink = {
  href: string;
  label: string;
  value: string;
};

export type ProjectLink = {
  href: string;
  label: string;
};

type ProjectMediaBase = {
  alt: string;
  caption: string;
};

export type ProjectImageMedia = ProjectMediaBase & {
  src: string;
  type?: "image";
};

export type ProjectVideoMedia = ProjectMediaBase & {
  poster: string;
  src: string;
  type: "video";
};

export type ProjectMedia = ProjectImageMedia | ProjectVideoMedia;

export function isProjectVideoMedia(
  media: ProjectMedia,
): media is ProjectVideoMedia {
  return media.type === "video";
}

export type ProjectEntry = {
  content?: string;
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
