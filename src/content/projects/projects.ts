import portfolioScreenshot from "../../assets/media/projects/portfolio/portfolio-dashboard.png";
import llmExperimentImage from "../../assets/media/projects/research/llm-experiment.png";
import thesisPdf from "../../assets/media/projects/research/code-quality-assessment-using-llm-2025.pdf";
import unityCameraGif from "../../assets/media/projects/unity/camera.gif";
import unityEnemyGif from "../../assets/media/projects/unity/enemy.gif";
import unityMenuImage from "../../assets/media/projects/unity/menu.png";
import unityMovementGif from "../../assets/media/projects/unity/movement.gif";
import unityPowerUpGif from "../../assets/media/projects/unity/power-up.gif";
import unityPortalGif from "../../assets/media/projects/unity/portal.gif";
import type { ProjectEntry } from "../../types/content";

export const projects: ProjectEntry[] = [
  {
    title: "Code Quality Assessment Using Large Language Models",
    slug: "code-quality-assessment-using-large-language-models",
    summary:
      "Bachelor’s thesis comparing LLM-based code quality assessment with static analysis methods for C# code.",
    publishedAt: "2025-06-15",
    dateLabel: "June 2025",
    tags: ["LLM", "Code quality", "Research", "Python", "C#"],
    problem:
      "This was my bachelor’s thesis project at Vilnius University. I explored how well large language models can assess source-code quality compared with static analyzers and expert review.",
    solution:
      "The project combined code scraping, prompt engineering, model evaluation, and statistical analysis. I collected C# methods from GitHub, filtered the dataset, prompted local LLMs as senior C# developers, compared results with SonarQube and SciTools Understand, and analyzed the output with Python.",
    technologies: [
      "Python",
      "C#",
      "Ollama",
      "SonarQube",
      "SciTools Understand",
      "Spreadsheets and statistical analysis",
    ],
    outcome:
      "LLMs showed real potential as supplementary code-quality tools, especially when paired with traditional analysis. Qwen2.5-Coder produced the strongest results, but the experiment also showed that LLMs are not yet direct replacements for objective static metrics.",
    highlights: [
      "The dataset contained 510 C# methods collected from GitHub and was filtered down to 310 clean samples after removing methods with compilation issues and external dependencies.",
      "Methods were evaluated with SonarQube, SciTools Understand, three local open-source LLMs, and four C# developers.",
      "The tested models were CodeLlama 7B, CodeGemma 7B, and Qwen2.5-Coder 7B served locally with Ollama.",
      "Each model evaluated 10 static metrics and four ISO-based maintainability scores: reusability, modifiability, analysability, and testability.",
      "Qwen2.5-Coder had the lowest average error in 9 of 10 static metrics and the best correlation with static tools and human judgments.",
      "CodeLlama struggled most, especially with size-related metrics such as line counts and comment lines.",
      "The work gave me practical experience with prompt engineering, static analysis tools, local LLM setup, dataset cleaning, and quantitative analysis with MAE, RMSE, and correlation coefficients.",
    ],
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
    featured: true,
  },
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    summary:
      "A personal website built to publish projects, blog posts, and software engineering notes.",
    publishedAt: "2024-09-15",
    dateLabel: "September 2024",
    tags: ["React", "Cloudflare Pages", "Portfolio", "Frontend"],
    problem:
      "Create a personal site for publishing projects and writing without relying on templates, no-code tools, or a hosted blog platform.",
    solution:
      "Built a React site from scratch, handled navigation with React Router, styled the interface with CSS, and prepared it as a static site for Cloudflare Pages.",
    technologies: ["React", "Cloudflare Pages", "CSS", "React Router"],
    outcome:
      "The first version helped me learn React, CSS layout, routing, and static deployment before later rebuilding the project with a cleaner typed content structure.",
    highlights: [
      "First end-to-end React project built without a UI template or component library.",
      "Used React Router for separate home, about, blog, and project pages.",
      "Prepared the site for static hosting and learned the routing trade-offs of frontend-only deployment.",
      "Identified later improvements: dark mode, filtering, better content structure, and a cleaner single-page flow.",
    ],
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
    featured: true,
  },
  {
    title: "3D Platformer Game",
    slug: "3d-platformer-game-in-unity",
    summary:
      "A Unity game prototype with movement, scene transitions, power-ups, and enemy interaction.",
    publishedAt: "2024-01-20",
    dateLabel: "January 2024",
    tags: ["Unity", "C#", "Game development", "3D"],
    problem:
      "Build a small 3D platformer prototype with movement, camera control, progression, power-ups, and enemy interaction.",
    solution:
      "Implemented a Unity prototype with a main menu, third-person camera, CharacterController-based movement, scene transitions, reusable power-up logic, and simple enemy knockback.",
    technologies: [
      "Unity",
      "C#",
      "Scene management",
      "CharacterController",
      "Coroutine-based gameplay logic",
    ],
    outcome:
      "The project improved my understanding of Unity scene management, third-person camera control, physics-style movement, trigger interactions, coroutine timing, and C# gameplay scripting.",
    highlights: [
      "Built a main-menu flow with scene loading through Unity SceneManager.",
      "Created a third-person orbit camera with clamped pitch and horizontal player rotation.",
      "Implemented WASD movement, gravity, jumping, and a temporary jump boost power-up.",
      "Used a PowerUpManager singleton to reactivate power-ups after respawn.",
      "Added enemy collision feedback with directional knockback and temporary movement interruption.",
      "Shipped a basic two-level loop with portal-based progression.",
    ],
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
        src: unityCameraGif,
        alt: "Third-person camera orbit from the Unity platformer.",
        caption:
          "Custom camera orbit with mouse input and clamped vertical rotation.",
      },
      {
        src: unityMovementGif,
        alt: "Player movement and jump mechanic from the Unity platformer.",
        caption: "CharacterController movement with gravity and jump behavior.",
      },
      {
        src: unityPowerUpGif,
        alt: "Jump boost power-up from the Unity platformer.",
        caption:
          "Temporary jump boost handled through coroutine-based gameplay logic.",
      },
      {
        src: unityEnemyGif,
        alt: "Enemy knockback interaction from the Unity platformer.",
        caption: "Enemy collision feedback using directional knockback.",
      },
      {
        src: unityPortalGif,
        alt: "Portal transition animation from the Unity platformer.",
        caption: "Level transition sequence used to progress through scenes.",
      },
    ],
    featured: true,
  },
];

export const projectsByDate = [...projects].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
