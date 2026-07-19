import cechasShot from "../assets/media/work/cechas.webp";
import rethreadShot from "../assets/media/work/rethread.webp";
import seimosShot from "../assets/media/work/seimos.webp";
import type { WorkEntry } from "../types/content";

export const work: WorkEntry[] = [
  {
    slug: "seimos-ideju-centras",
    title: "Šeimos idėjų centras",
    tag: "NGO",
    year: "2025",
    url: "https://seimos-ideju-centras.pages.dev/",
    domain: "seimos-ideju-centras.pages.dev",
    summary:
      "A warm, accessible website for a Lithuanian NGO providing social services to children and families.",
    shot: seimosShot,
  },
  {
    slug: "cechas",
    title: "Cechas",
    tag: "Restaurant",
    year: "2025",
    url: "https://cechas.pages.dev/",
    domain: "cechas.pages.dev",
    summary:
      "A bilingual open-fire bistro concept for Paupys — typed localisation, menu data, motion and static Next.js export.",
    shot: cechasShot,
  },
  {
    slug: "rethread",
    title: "Rethread",
    tag: "Service",
    year: "2026",
    url: "https://rethread-b2q.pages.dev/",
    domain: "rethread-b2q.pages.dev",
    summary:
      "A clothing-repair-by-mail service covering all of Lithuania — clear pricing, calm flow.",
    shot: rethreadShot,
  },
];
