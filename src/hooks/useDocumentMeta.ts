import { useEffect } from "react";
import { siteConfig } from "../content/site";

type DocumentMeta = {
  description?: string;
  title: string;
};

export function useDocumentMeta({ description, title }: DocumentMeta) {
  useEffect(() => {
    document.title = `${title} | ${siteConfig.name}`;

    if (!description) {
      return;
    }

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [description, title]);
}
