import { useEffect } from "react";
import { getCanonicalUrl, type RouteMetadata } from "../content/routeMetadata";

type MetaSelector = {
  attribute: "name" | "property";
  key: string;
};

function setMetaContent({ attribute, key }: MetaSelector, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.setAttribute("content", content);
}

function setCanonicalUrl(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.append(element);
  }

  element.setAttribute("href", url);
}

export function useDocumentMeta(metadata: RouteMetadata) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(metadata.canonicalPathname);

    document.title = metadata.title;
    setCanonicalUrl(canonicalUrl);
    setMetaContent(
      { attribute: "name", key: "description" },
      metadata.description,
    );
    setMetaContent({ attribute: "name", key: "robots" }, metadata.robots);
    setMetaContent({ attribute: "property", key: "og:type" }, metadata.ogType);
    setMetaContent({ attribute: "property", key: "og:url" }, canonicalUrl);
    setMetaContent({ attribute: "property", key: "og:title" }, metadata.title);
    setMetaContent(
      { attribute: "property", key: "og:description" },
      metadata.description,
    );
    setMetaContent({ attribute: "name", key: "twitter:card" }, "summary");
    setMetaContent({ attribute: "name", key: "twitter:title" }, metadata.title);
    setMetaContent(
      { attribute: "name", key: "twitter:description" },
      metadata.description,
    );
  }, [metadata]);
}
