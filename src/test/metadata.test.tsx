import { screen } from "@testing-library/react";
import {
  getBlogPostRouteMetadata,
  getCanonicalUrl,
  getProjectRouteMetadata,
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
  });

  it("sets project detail metadata", async () => {
    const metadata = getProjectRouteMetadata(
      "code-quality-assessment-using-large-language-models",
    );

    renderApp([metadata.canonicalPathname]);

    await screen.findByRole("heading", {
      name: /Code Quality Assessment Using Large Language Models/i,
    });

    expectDocumentMetadata(metadata.canonicalPathname);
  });

  it("sets blog post metadata", async () => {
    const metadata = getBlogPostRouteMetadata(
      "software-engineering-at-vilnius-university",
    );

    renderApp([metadata.canonicalPathname]);

    await screen.findByRole("heading", {
      name: /Software Engineering at Vilnius University/i,
    });

    expectDocumentMetadata(metadata.canonicalPathname);
    expect(getMetaContent("property", "og:type")).toBe("article");
  });
});
