import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { publicRouteMetadata } from "../src/content/routeMetadata.js";
import {
  applyRouteMetadata,
  getRouteOutputPath,
  readSitemapPaths,
} from "./route-html-utils.mjs";

function validateRouteMetadata() {
  const seen = new Set();

  for (const metadata of publicRouteMetadata) {
    if (seen.has(metadata.canonicalPathname)) {
      throw new Error(
        `Duplicate route metadata: ${metadata.canonicalPathname}`,
      );
    }

    seen.add(metadata.canonicalPathname);

    for (const key of ["title", "description", "canonicalPathname", "ogType"]) {
      if (!metadata[key]) {
        throw new Error(
          `Missing ${key} for route ${metadata.canonicalPathname}`,
        );
      }
    }
  }
}

async function validateSitemapConsistency() {
  const sitemapPaths = await readSitemapPaths();
  const metadataPaths = publicRouteMetadata.map(
    (metadata) => metadata.canonicalPathname,
  );

  const missingFromSitemap = metadataPaths.filter(
    (pathname) => !sitemapPaths.includes(pathname),
  );
  const missingFromMetadata = sitemapPaths.filter(
    (pathname) => !metadataPaths.includes(pathname),
  );

  if (missingFromSitemap.length || missingFromMetadata.length) {
    throw new Error(
      [
        "Sitemap and route metadata paths do not match.",
        `Missing from sitemap: ${missingFromSitemap.join(", ") || "none"}`,
        `Missing from metadata: ${missingFromMetadata.join(", ") || "none"}`,
      ].join("\n"),
    );
  }
}

validateRouteMetadata();
await validateSitemapConsistency();

const baseHtml = await readFile("dist/index.html", "utf8");

for (const metadata of publicRouteMetadata) {
  const outputPath = getRouteOutputPath(metadata.canonicalPathname);
  const routeHtml = applyRouteMetadata(baseHtml, metadata);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, routeHtml);
}

console.log(
  `Generated metadata HTML for ${publicRouteMetadata.length} routes.`,
);
