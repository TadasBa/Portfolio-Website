import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  getBlogPostRouteMetadata,
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
  it("renders metadata for home and writing routes", async () => {
    const { applyRouteMetadata } = await routeHtmlUtilsPromise;
    const homeHtml = applyRouteMetadata(baseHtml, requireRouteMetadata("/"));
    const postHtml = applyRouteMetadata(
      baseHtml,
      getBlogPostRouteMetadata("placeholder-1"),
    );

    expect(homeHtml).toContain(
      "<title>Tadas Baltrūnas — Software engineer</title>",
    );
    expect(homeHtml).toContain(
      '<meta name="robots" content="index, follow" />',
    );
    expect(postHtml).toContain('<meta property="og:type" content="article" />');
    expect(postHtml).toContain(
      '<meta name="robots" content="index, follow" />',
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

  it("keeps the sitemap in sync with indexable routes", async () => {
    const { readSitemapPaths } = await routeHtmlUtilsPromise;
    const sitemap = await readSitemapPaths();

    expect([...indexableRoutePaths].sort()).toEqual([...sitemap].sort());
    expect(indexableRoutePaths).toContain("/");
    expect(indexableRoutePaths).toContain("/blog/placeholder-1");
    expect(indexableRoutePaths).toContain("/work");
  });
});
