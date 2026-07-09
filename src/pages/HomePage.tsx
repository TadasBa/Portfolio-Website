import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { requireRouteMetadata } from "../content/routeMetadata";
import { Stage, type StagePanel } from "../features/stage/Stage";
import {
  AboutPanel,
  BlogPanel,
  ContactPanel,
  IntroPanel,
  WorkPanel,
} from "../features/stage/panels";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const panels: StagePanel[] = [
  { id: "intro", label: "Home", content: <IntroPanel /> },
  { id: "work", label: "Work", content: <WorkPanel /> },
  { id: "blog", label: "Blog", content: <BlogPanel /> },
  { id: "about", label: "About", content: <AboutPanel /> },
  { id: "contact", label: "Contact", content: <ContactPanel /> },
];

// every stage panel is addressable; the blog panel keeps a hash because
// /blog belongs to the dedicated post list page
const panelPaths: Record<string, string> = {
  intro: "/",
  work: "/work",
  blog: "/#blog",
  about: "/about",
  contact: "/contact",
};

function toMetadataPath(panelPath: string) {
  return panelPath.startsWith("/#") ? "/" : panelPath;
}

function panelIdFromLocation(pathname: string, hash: string) {
  const hashId = hash.replace(/^#/, "");
  if (hashId && panels.some((panel) => panel.id === hashId)) {
    return hashId;
  }
  const entry = Object.entries(panelPaths).find(
    ([, path]) => path === pathname,
  );
  return entry ? entry[0] : "intro";
}

export function HomePage() {
  const { pathname, hash } = useLocation();
  const [initialPanelId] = useState(() => panelIdFromLocation(pathname, hash));
  const [metadataPath, setMetadataPath] = useState(() =>
    toMetadataPath(panelPaths[initialPanelId]),
  );

  useDocumentMeta(requireRouteMetadata(metadataPath));

  const handlePanelChange = useCallback((panelId: string) => {
    const path = panelPaths[panelId];
    if (!path) {
      return;
    }
    // replace instead of push so browsing the stage never bloats history
    window.history.replaceState(window.history.state, "", path);
    setMetadataPath(toMetadataPath(path));
  }, []);

  return (
    <Stage
      initialPanelId={initialPanelId}
      onPanelChange={handlePanelChange}
      panels={panels}
    />
  );
}
