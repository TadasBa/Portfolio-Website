import { screen } from "@testing-library/react";
import {
  getBlogPostRouteMetadata,
  getCanonicalUrl,
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
}

describe("route metadata", () => {
  it("sets home metadata", async () => {
    renderApp(["/"]);

    await screen.findByRole("heading", { name: /focused on the frontend/i });

    expectDocumentMetadata("/");
    expect(requireRouteMetadata("/").title).toBe(
      "Tadas Baltrūnas — Software engineer",
    );
    expect(requireRouteMetadata("/").robots).toBe("index, follow");
  });

  it("marks every public route as indexable", () => {
    expect(
      publicRouteMetadata.every(
        (metadata) => metadata.robots === "index, follow",
      ),
    ).toBe(true);
  });

  it("sets blog post metadata as an indexable article", async () => {
    const metadata = getBlogPostRouteMetadata("rebuilt-this-site-14-times");

    renderApp([metadata.canonicalPathname]);

    await screen.findByRole(
      "heading",
      { name: /rebuilt this site/i },
      { timeout: 3000 },
    );

    expectDocumentMetadata(metadata.canonicalPathname);
    expect(getMetaContent("property", "og:type")).toBe("article");
    expect(metadata.robots).toBe("index, follow");
  });

  it("marks not found routes as noindex", async () => {
    renderApp(["/missing-page"]);

    await screen.findByText(/Off the stage/i);

    expect(document.title).toBe(notFoundMetadata.title);
    expect(getMetaContent("name", "robots")).toBe("noindex, follow");
  });
});
