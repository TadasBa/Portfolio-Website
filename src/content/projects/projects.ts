import portfolioScreenshot from "../../assets/media/projects/portfolio/portfolio-dashboard.png";
import llmExperimentImage from "../../assets/media/projects/research/llm-experiment.png";
import thesisPdf from "../../assets/media/projects/research/code-quality-assessment-using-llm-2025.pdf";
import unityCameraPoster from "../../assets/media/projects/unity/camera-poster.webp";
import unityCameraVideo from "../../assets/media/projects/unity/camera.webm";
import unityEnemyPoster from "../../assets/media/projects/unity/enemy-poster.webp";
import unityEnemyVideo from "../../assets/media/projects/unity/enemy.webm";
import unityMenuImage from "../../assets/media/projects/unity/menu.webp";
import unityMovementPoster from "../../assets/media/projects/unity/movement-poster.webp";
import unityMovementVideo from "../../assets/media/projects/unity/movement.webm";
import unityPowerUpPoster from "../../assets/media/projects/unity/power-up-poster.webp";
import unityPowerUpVideo from "../../assets/media/projects/unity/power-up.webm";
import unityPortalPoster from "../../assets/media/projects/unity/portal-poster.webp";
import unityPortalVideo from "../../assets/media/projects/unity/portal.webm";
import type { ProjectEntry } from "../../types/content";
import { projectContent } from "./projectContent";

const projectMedia: Record<string, Pick<ProjectEntry, "gallery" | "links">> = {
  "code-quality-assessment-using-large-language-models": {
    links: [
      {
        label: "Thesis PDF",
        href: thesisPdf,
      },
    ],
    gallery: [
      {
        src: llmExperimentImage,
        alt: "Chart and spreadsheet snapshot from the LLM code quality experiment.",
        caption:
          "Experiment output and comparison workflow used in the thesis.",
      },
    ],
  },
  "portfolio-website": {
    links: [
      {
        label: "Live Site",
        href: "https://tadas.baltrunas.lt/",
      },
      {
        label: "Repository",
        href: "https://github.com/TadasBa/Blog",
      },
    ],
    gallery: [
      {
        src: portfolioScreenshot,
        alt: "Screenshot of the portfolio website interface.",
        caption: "The site before the Vite and TypeScript rebuild.",
      },
    ],
  },
  "3d-platformer-game-in-unity": {
    links: [
      {
        label: "Source Code",
        href: "https://github.com/TadasBa/3D-Game",
      },
    ],
    gallery: [
      {
        src: unityMenuImage,
        alt: "Main menu screen from the Unity platformer project.",
        caption: "Main-menu and interface layer for the Unity project.",
      },
      {
        type: "video",
        poster: unityCameraPoster,
        src: unityCameraVideo,
        alt: "Third-person camera orbit from the Unity platformer.",
        caption:
          "Custom camera orbit with mouse input and clamped vertical rotation.",
      },
      {
        type: "video",
        poster: unityMovementPoster,
        src: unityMovementVideo,
        alt: "Player movement and jump mechanic from the Unity platformer.",
        caption: "CharacterController movement with gravity and jump behavior.",
      },
      {
        type: "video",
        poster: unityPowerUpPoster,
        src: unityPowerUpVideo,
        alt: "Jump boost power-up from the Unity platformer.",
        caption:
          "Temporary jump boost handled through coroutine-based gameplay logic.",
      },
      {
        type: "video",
        poster: unityEnemyPoster,
        src: unityEnemyVideo,
        alt: "Enemy knockback interaction from the Unity platformer.",
        caption: "Enemy collision feedback using directional knockback.",
      },
      {
        type: "video",
        poster: unityPortalPoster,
        src: unityPortalVideo,
        alt: "Portal transition animation from the Unity platformer.",
        caption: "Level transition sequence used to progress through scenes.",
      },
    ],
  },
};

export const projects: ProjectEntry[] = projectContent.map((project) => ({
  ...project,
  ...projectMedia[project.slug],
}));

export const projectsByDate = [...projects].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
