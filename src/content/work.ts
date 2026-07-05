import brukneShot from "../assets/media/work/brukne.webp";
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
    slug: "brukne",
    title: "Bruknė",
    tag: "Bakery",
    year: "2025",
    url: "https://brukne-2sa.pages.dev/",
    domain: "brukne-2sa.pages.dev",
    summary:
      "A boutique bakery studio in Vilnius — serif identity, quiet motion, online menu and booking.",
    shot: brukneShot,
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
