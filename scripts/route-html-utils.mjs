import { readFile } from "node:fs/promises";
import { productionSiteUrl } from "../src/content/routeMetadata.js";

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function getCanonicalUrl(pathname) {
  return new URL(pathname, productionSiteUrl).toString();
}

export function getRenderedRouteMetadata(metadata) {
  const canonicalUrl = getCanonicalUrl(metadata.canonicalPathname);

  return {
    canonicalUrl,
    description: metadata.description,
    ogDescription: metadata.description,
    ogTitle: metadata.title,
    ogType: metadata.ogType,
    ogUrl: canonicalUrl,
    robots: metadata.robots,
    title: metadata.title,
    twitterCard: "summary",
    twitterDescription: metadata.description,
    twitterTitle: metadata.title,
  };
}

function replaceOrInsert(html, pattern, replacement, marker = "</head>") {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace(marker, `    ${replacement}\n  ${marker}`);
}

export function applyRouteMetadata(html, metadata) {
  const rendered = getRenderedRouteMetadata(metadata);

  let output = html;

  output = replaceOrInsert(
    output,
    /<title>.*?<\/title>/s,
    `<title>${escapeHtml(rendered.title)}</title>`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="description" content="${escapeHtml(rendered.description)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="robots" content="${escapeHtml(rendered.robots)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/s,
    `<link rel="canonical" href="${escapeHtml(rendered.canonicalUrl)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:type" content="${escapeHtml(rendered.ogType)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:url" content="${escapeHtml(rendered.ogUrl)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:title" content="${escapeHtml(rendered.ogTitle)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:description" content="${escapeHtml(
      rendered.ogDescription,
    )}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="twitter:card" content="${escapeHtml(rendered.twitterCard)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="twitter:title" content="${escapeHtml(rendered.twitterTitle)}" />`,
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="twitter:description" content="${escapeHtml(
      rendered.twitterDescription,
    )}" />`,
  );

  return output;
}

export function getRouteOutputPath(pathname) {
  return pathname === "/" ? "dist/index.html" : `dist${pathname}/index.html`;
}

export async function readSitemapPaths() {
  const sitemap = await readFile("public/sitemap.xml", "utf8");
  const pattern = /<loc>(.*?)<\/loc>/g;

  return [...sitemap.matchAll(pattern)].map((match) => {
    const url = new URL(match[1]);

    if (url.origin !== productionSiteUrl) {
      throw new Error(`Unexpected sitemap origin: ${url.origin}`);
    }

    return url.pathname;
  });
}
