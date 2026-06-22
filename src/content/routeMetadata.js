import { blogPostContent } from "./blog/postContent.js";
import { projectContent } from "./projects/projectContent.js";
import { siteConfig } from "./site.js";

export const productionSiteUrl = "https://tadas.baltrunas.lt";

const staticRouteMetadata = [
  {
    canonicalPathname: "/",
    title: "Tadas Baltrūnas — Portfolio",
    description:
      "Portfolio of Tadas Baltrūnas, a software developer focused on practical web projects, frontend development, automation, and deployment.",
    ogType: "website",
    robots: "index, follow",
  },
  {
    canonicalPathname: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "About Tadas Baltrunas, a developer focused on frontend, automation, and practical systems.",
    ogType: "website",
    robots: "noindex, follow",
  },
  {
    canonicalPathname: "/projects",
    title: `Projects | ${siteConfig.name}`,
    description:
      "Projects from frontend development, software engineering studies, and technical experiments.",
    ogType: "website",
    robots: "noindex, follow",
  },
  {
    canonicalPathname: "/blog",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Blog posts from Tadas Baltrunas about software engineering, frontend development, studies, and project work.",
    ogType: "website",
    robots: "noindex, follow",
  },
  {
    canonicalPathname: "/stack",
    title: `Stack | ${siteConfig.name}`,
    description: "Technologies and tools used by Tadas Baltrunas.",
    ogType: "website",
    robots: "noindex, follow",
  },
];

const projectRouteMetadata = projectContent.map((project) => ({
  canonicalPathname: `/projects/${project.slug}`,
  title: `${project.title} | ${siteConfig.name}`,
  description: project.summary,
  ogType: "website",
  robots: "noindex, follow",
}));

const blogRouteMetadata = blogPostContent.map((post) => ({
  canonicalPathname: `/blog/${post.slug}`,
  title: `${post.title} | ${siteConfig.name}`,
  description: post.summary,
  ogType: "article",
  robots: "noindex, follow",
}));

export const publicRouteMetadata = [
  ...staticRouteMetadata,
  ...projectRouteMetadata,
  ...blogRouteMetadata,
].sort((left, right) =>
  left.canonicalPathname.localeCompare(right.canonicalPathname),
);

export const publicRoutePaths = publicRouteMetadata.map(
  (metadata) => metadata.canonicalPathname,
);

export const indexableRouteMetadata = publicRouteMetadata.filter(
  (metadata) => metadata.robots === "index, follow",
);

export const indexableRoutePaths = indexableRouteMetadata.map(
  (metadata) => metadata.canonicalPathname,
);

export const notFoundMetadata = {
  canonicalPathname: "/",
  title: `Page not found | ${siteConfig.name}`,
  description: "The requested page could not be found.",
  ogType: "website",
  robots: "noindex, follow",
};

export function getCanonicalUrl(pathname) {
  return new URL(pathname, productionSiteUrl).toString();
}

export function getRouteMetadata(pathname) {
  return publicRouteMetadata.find(
    (metadata) => metadata.canonicalPathname === pathname,
  );
}

export function requireRouteMetadata(pathname) {
  const metadata = getRouteMetadata(pathname);

  if (!metadata) {
    throw new Error(`Missing route metadata for ${pathname}`);
  }

  return metadata;
}

export function getProjectRouteMetadata(slug) {
  return requireRouteMetadata(`/projects/${slug}`);
}

export function getBlogPostRouteMetadata(slug) {
  return requireRouteMetadata(`/blog/${slug}`);
}
