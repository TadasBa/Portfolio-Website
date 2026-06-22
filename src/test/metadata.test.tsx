import { screen } from "@testing-library/react";
import {
  getBlogPostRouteMetadata,
  getCanonicalUrl,
  getProjectRouteMetadata,
  notFoundMetadata,
  publicRouteMetadata,
  requireRouteMetadata,
} from "../content/routeMetadata";
import { renderApp } from "./renderApp";

function getMetaContent(attribute: "name" | "property", key: string) {
  return document.head
    .querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    ?.getAttribute("content");
}

const routeLoadLabels: Record<string, RegExp> = {
  "/about": /What I am up to/i,
  "/blog": /Learning log/i,
  "/projects": /Personal work/i,
  "/stack": /Tech Stack/i,
};

function expectDocumentMetadata(pathname: string) {
  const metadata = requireRouteMetadata(pathname);
  const canonicalUrl = getCanonicalUrl(pathname);

  expect(document.title).toBe(metadata.title);
  expect(
    document.head
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute("href"),
  ).toBe(canonicalUrl);
  expect(getMetaContent("name", "description")).toBe(metadata.description);
  expect(getMetaContent("name", "robots")).toBe(metadata.robots);
  expect(getMetaContent("property", "og:type")).toBe(metadata.ogType);
  expect(getMetaContent("property", "og:url")).toBe(canonicalUrl);
  expect(getMetaContent("property", "og:title")).toBe(metadata.title);
  expect(getMetaContent("property", "og:description")).toBe(
    metadata.description,
  );
  expect(getMetaContent("name", "twitter:card")).toBe("summary");
  expect(getMetaContent("name", "twitter:title")).toBe(metadata.title);
  expect(getMetaContent("name", "twitter:description")).toBe(
    metadata.description,
  );
}

describe("route metadata", () => {
  it("sets home metadata", async () => {
    renderApp(["/"]);

    await screen.findByRole("heading", { name: /Tadas Baltrūnas/i });

    expectDocumentMetadata("/");
    expect(requireRouteMetadata("/").title).toBe("Tadas Baltrūnas — Portfolio");
    expect(requireRouteMetadata("/").robots).toBe("index, follow");
  });

  it.each(["/about", "/projects", "/blog", "/stack"])(
    "marks %s as noindex",
    async (pathname) => {
      renderApp([pathname]);

      await screen.findByRole("heading", { name: routeLoadLabels[pathname] });

      expectDocumentMetadata(pathname);
      expect(requireRouteMetadata(pathname).robots).toBe("noindex, follow");
    },
  );

  it("marks every non-home route as noindex", () => {
    expect(
      publicRouteMetadata
        .filter((metadata) => metadata.canonicalPathname !== "/")
        .every((metadata) => metadata.robots === "noindex, follow"),
    ).toBe(true);
  });

  it("sets project detail metadata", async () => {
    const metadata = getProjectRouteMetadata(
      "code-quality-assessment-using-large-language-models",
    );

    renderApp([metadata.canonicalPathname]);

    await screen.findByRole(
      "heading",
      {
        name: /Code Quality Assessment Using Large Language Models/i,
      },
      { timeout: 3000 },
    );

    expectDocumentMetadata(metadata.canonicalPathname);
    expect(metadata.robots).toBe("noindex, follow");
  });

  it("sets blog post metadata", async () => {
    const metadata = getBlogPostRouteMetadata(
      "software-engineering-at-vilnius-university",
    );

    renderApp([metadata.canonicalPathname]);

    await screen.findByRole(
      "heading",
      {
        name: /Software Engineering at Vilnius University/i,
      },
      { timeout: 3000 },
    );

    expectDocumentMetadata(metadata.canonicalPathname);
    expect(getMetaContent("property", "og:type")).toBe("article");
    expect(metadata.robots).toBe("noindex, follow");
  });

  it("marks not found routes as noindex", async () => {
    renderApp(["/missing-page"]);

    await screen.findByText(/Page not found/i);

    expect(document.title).toBe(notFoundMetadata.title);
    expect(getMetaContent("name", "robots")).toBe("noindex, follow");
  });
});
