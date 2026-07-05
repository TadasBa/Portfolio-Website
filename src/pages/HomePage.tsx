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
  { id: "intro", label: "Intro", content: <IntroPanel /> },
  { id: "work", label: "Work", content: <WorkPanel /> },
  { id: "blog", label: "Blog", content: <BlogPanel /> },
  { id: "about", label: "About", content: <AboutPanel /> },
  { id: "contact", label: "Contact", content: <ContactPanel /> },
];

export function HomePage() {
  useDocumentMeta(requireRouteMetadata("/"));
  return <Stage panels={panels} />;
}
