import { access, readFile } from "node:fs/promises";
import {
  getCanonicalUrl,
  indexableRoutePaths,
  publicRouteMetadata,
} from "../src/content/routeMetadata.js";
import {
  getRenderedRouteMetadata,
  getRouteOutputPath,
  readSitemapPaths,
} from "./route-html-utils.mjs";

function includesHtml(html, expected, label) {
  if (!html.includes(expected)) {
    throw new Error(`Missing ${label}: ${expected}`);
  }
}

async function validateSitemapConsistency() {
  const sitemapPaths = await readSitemapPaths();
  if (
    sitemapPaths.length !== indexableRoutePaths.length ||
    sitemapPaths.some((pathname) => !indexableRoutePaths.includes(pathname))
  ) {
    throw new Error(
      "Sitemap route list does not match indexable route metadata paths.",
    );
  }
}

await validateSitemapConsistency();

const homepageCanonical = getCanonicalUrl("/");

for (const metadata of publicRouteMetadata) {
  const outputPath = getRouteOutputPath(metadata.canonicalPathname);

  await access(outputPath);

  const html = await readFile(outputPath, "utf8");
  const rendered = getRenderedRouteMetadata(metadata);

  includesHtml(html, `<title>${rendered.title}</title>`, "title");
  includesHtml(
    html,
    `<link rel="canonical" href="${rendered.canonicalUrl}" />`,
    "canonical URL",
  );
  includesHtml(
    html,
    `<meta property="og:title" content="${rendered.ogTitle}" />`,
    "Open Graph title",
  );
  includesHtml(
    html,
    `<meta name="robots" content="${rendered.robots}" />`,
    "robots directive",
  );

  if (
    metadata.canonicalPathname !== "/" &&
    html.includes(`<link rel="canonical" href="${homepageCanonical}" />`)
  ) {
    throw new Error(
      `${outputPath} contains the generic homepage canonical URL.`,
    );
  }

  if (
    metadata.canonicalPathname.startsWith("/blog/") &&
    !html.includes('<meta property="og:type" content="article" />')
  ) {
    throw new Error(`${outputPath} does not contain article og:type.`);
  }
}

console.log(
  `Validated metadata HTML for ${publicRouteMetadata.length} routes.`,
);
