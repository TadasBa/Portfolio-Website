import portfolioScreenshot from "../../assets/media/projects/portfolio/portfolio-dashboard.png";
import llmExperimentImage from "../../assets/media/projects/research/llm-experiment.png";
import thesisPdf from "../../assets/media/projects/research/code-quality-assessment-using-llm-2025.pdf";
import unityMenuImage from "../../assets/media/projects/unity/menu.png";
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
      "Compare LLM-based code quality assessment with traditional static analysis for C# methods.",
    solution:
      "Built an experimental pipeline to collect C# methods, run model-based assessments, compare results with static metrics, and analyze the output.",
    technologies: [
      "Python",
      "C#",
      "Ollama",
      "SonarQube",
      "SciTools Understand",
      "Spreadsheets and statistical analysis",
    ],
    outcome:
      "The project gave me practical experience with model evaluation, data preparation, and measurable software quality research.",
    highlights: [
      "Collected and filtered 510 GitHub C# methods into a clean evaluation set.",
      "Compared model outputs with both static analyzers and human reviewers.",
      "Used strict JSON prompting to keep results measurable and automatable.",
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
    tags: ["React", "GitHub Pages", "Portfolio", "Frontend"],
    problem:
      "Create a personal site for projects and blog posts without relying on a template.",
    solution:
      "Built a React site with static deployment, typed content, project pages, and blog pages.",
    technologies: ["React", "GitHub Pages", "CSS", "React Router"],
    outcome:
      "The project helped clarify how routing, content structure, and static hosting affect a small frontend site.",
    highlights: [
      "First end-to-end React project built without a UI template.",
      "Learned how BrowserRouter, basenames, and static hosting interact.",
      "Moved project and blog content out of page components.",
    ],
    links: [
      {
        label: "Live Site",
        href: "https://tadasba.github.io/Blog/",
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
      "Build a small 3D platformer prototype with movement, progression, and basic interaction.",
    solution:
      "Implemented player controls, menu flow, scene transitions, reusable power-up logic, and enemy interaction in Unity.",
    technologies: [
      "Unity",
      "C#",
      "Scene management",
      "CharacterController",
      "Coroutine-based gameplay logic",
    ],
    outcome:
      "The project improved my understanding of Unity scripting, scene management, and reusable gameplay logic.",
    highlights: [
      "Built camera and player controls instead of relying entirely on stock behavior.",
      "Used a central power-up manager to keep gameplay extensions modular.",
      "Shipped a complete loop with menu, two levels, progression, and enemy feedback.",
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
