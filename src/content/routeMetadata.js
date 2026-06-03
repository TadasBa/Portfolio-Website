import { blogPostContent } from "./blog/postContent.js";
import { projectContent } from "./projects/projectContent.js";
import { siteConfig } from "./site.js";

export const productionSiteUrl = "https://tadas.baltrunas.lt";

const staticRouteMetadata = [
  {
    canonicalPathname: "/",
    title: "Tadas Baltrūnas | Frontend, Automation, Systems",
    description:
      "Portfolio of Tadas Baltrunas, a developer focused on frontend and practical systems.",
    ogType: "website",
  },
  {
    canonicalPathname: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "About Tadas Baltrunas, a developer focused on frontend, automation, and practical systems.",
    ogType: "website",
  },
  {
    canonicalPathname: "/projects",
    title: `Projects | ${siteConfig.name}`,
    description:
      "Projects from frontend development, software engineering studies, and technical experiments.",
    ogType: "website",
  },
  {
    canonicalPathname: "/blog",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Blog posts from Tadas Baltrunas about software engineering, frontend development, studies, and project work.",
    ogType: "website",
  },
  {
    canonicalPathname: "/stack",
    title: `Stack | ${siteConfig.name}`,
    description: "Technologies and tools used by Tadas Baltrunas.",
    ogType: "website",
  },
];

const projectRouteMetadata = projectContent.map((project) => ({
  canonicalPathname: `/projects/${project.slug}`,
  title: `${project.title} | ${siteConfig.name}`,
  description: project.summary,
  ogType: "website",
}));

const blogRouteMetadata = blogPostContent.map((post) => ({
  canonicalPathname: `/blog/${post.slug}`,
  title: `${post.title} | ${siteConfig.name}`,
  description: post.summary,
  ogType: "article",
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

export const notFoundMetadata = {
  canonicalPathname: "/",
  title: `Page not found | ${siteConfig.name}`,
  description: "The requested page could not be found.",
  ogType: "website",
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
