import { blogPostContent } from "./blog/postContent.js";
import { siteConfig } from "./site.js";

export const productionSiteUrl = "https://tadas.baltrunas.lt";

const staticRouteMetadata = [
  {
    canonicalPathname: "/",
    title: "Tadas Baltrūnas — Software engineer",
    description:
      "Tadas Baltrūnas — a developer in Vilnius, mostly frontend. Selected work, writing, and contact.",
    ogType: "website",
    robots: "index, follow",
  },
  {
    canonicalPathname: "/work",
    title: `Work | ${siteConfig.name}`,
    description:
      "Selected work by Tadas Baltrūnas — websites and web interfaces.",
    ogType: "website",
    robots: "index, follow",
  },
  {
    canonicalPathname: "/about",
    title: `About | ${siteConfig.name}`,
    description: "About Tadas Baltrūnas — a developer in Vilnius.",
    ogType: "website",
    robots: "index, follow",
  },
  {
    canonicalPathname: "/contact",
    title: `Contact | ${siteConfig.name}`,
    description: "Contact Tadas Baltrūnas — email and links.",
    ogType: "website",
    robots: "index, follow",
  },
  {
    canonicalPathname: "/blog",
    title: `Blog | ${siteConfig.name}`,
    description: "Blog posts by Tadas Baltrūnas.",
    ogType: "website",
    robots: "index, follow",
  },
];

const blogRouteMetadata = blogPostContent.map((post) => ({
  canonicalPathname: `/blog/${post.slug}`,
  title: `${post.title} | ${siteConfig.name}`,
  description: post.summary,
  ogType: "article",
  robots: "index, follow",
}));

export const publicRouteMetadata = [
  ...staticRouteMetadata,
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

export function getBlogPostRouteMetadata(slug) {
  return requireRouteMetadata(`/blog/${slug}`);
}
