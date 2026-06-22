import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  indexableRoutePaths,
  requireRouteMetadata,
} from "../content/routeMetadata";

const routeHtmlUtilsPromise = import(
  pathToFileURL(resolve(process.cwd(), "scripts/route-html-utils.mjs")).href
);

const baseHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Base title</title>
    <meta name="description" content="Base description" />
  </head>
  <body></body>
</html>`;

describe("route HTML utilities", () => {
  it("renders robots metadata for home and noindex routes", async () => {
    const { applyRouteMetadata } = await routeHtmlUtilsPromise;
    const homeHtml = applyRouteMetadata(baseHtml, requireRouteMetadata("/"));
    const aboutHtml = applyRouteMetadata(
      baseHtml,
      requireRouteMetadata("/about"),
    );

    expect(homeHtml).toContain("<title>Tadas Baltrūnas — Portfolio</title>");
    expect(homeHtml).toContain(
      '<meta name="robots" content="index, follow" />',
    );
    expect(aboutHtml).toContain(
      '<meta name="robots" content="noindex, follow" />',
    );
  });

  it("escapes robots metadata content alongside other fields", async () => {
    const { applyRouteMetadata, getRenderedRouteMetadata } =
      await routeHtmlUtilsPromise;
    const html = applyRouteMetadata(baseHtml, {
      canonicalPathname: "/test",
      description: 'A "quoted" description',
      ogType: "website",
      robots: 'noindex, follow & "archive"',
      title: "Title <Test>",
    });
    const rendered = getRenderedRouteMetadata({
      canonicalPathname: "/test",
      description: 'A "quoted" description',
      ogType: "website",
      robots: 'noindex, follow & "archive"',
      title: "Title <Test>",
    });

    expect(html).toContain(
      `<meta name="robots" content="noindex, follow &amp; &quot;archive&quot;" />`,
    );
    expect(rendered.robots).toBe('noindex, follow & "archive"');
    expect(html).toContain("<title>Title &lt;Test&gt;</title>");
  });

  it("keeps only indexable routes in the sitemap", async () => {
    const { readSitemapPaths } = await routeHtmlUtilsPromise;
    expect(indexableRoutePaths).toEqual(["/"]);
    await expect(readSitemapPaths()).resolves.toEqual(["/"]);
  });
});
