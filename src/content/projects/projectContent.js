export const projectContent = [
  {
    title: "HotPathTrace.NET",
    slug: "hotpathtrace-dotnet",
    summary:
      "Project comparing NDJSON and binary event logging using deterministic replay and BenchmarkDotNet",
    publishedAt: "2026-06-01",
    dateLabel: "June 2026",
    tags: ["C#", ".NET", "BenchmarkDotNet", "Performance", "Logging"],
    problem:
      "I wanted to see what changes when the same generated events are saved as NDJSON and as a small binary file.",
    solution:
      "I generated deterministic events, wrote readers and writers for both formats, checked replay order and binary checksums, then measured the paths with BenchmarkDotNet.",
    technologies: [
      "C#",
      ".NET 10",
      "xUnit",
      "BenchmarkDotNet",
      "System.Text.Json",
      "BinaryWriter",
      "BinaryReader",
    ],
    outcome:
      "Binary logs were smaller and faster to write. Replay was faster too, but my binary reader still allocated more than I expected, so there is probably still work to do there.",
    highlights: [
      "Used one deterministic event stream for both formats.",
      "Checked replay for missing, duplicated, and out-of-order events.",
      "Added a checksum to the binary log.",
      "Measured the code instead of guessing.",
    ],
    content: `HotPathTrace.NET is a small C#/.NET project where I compared two ways of storing generated event logs: readable NDJSON and a compact binary format.

I did not want to pretend this was a real trading system or a production logger. It was just a small project to check what changes when a lot of small events are written and replayed in different formats.

## What I built

- deterministic synthetic event generator
- NDJSON event writer and replay reader
- binary event writer and replay reader
- sequence validation for missing, duplicated, or out-of-order events
- checksum validation for binary logs
- BenchmarkDotNet benchmarks for write and replay operations.

I used the same generated events for both formats, then replayed them back.

## File size results

Local run with seed \`42\`.

| Events | NDJSON size | Binary size | Difference |
| ------: | ----------: | ----------: | ---------: |
| 1,000 | 112,603 B | 37,024 B | 3.04x smaller |
| 10,000 | 1,135,900 B | 370,024 B | 3.07x smaller |
| 100,000 | 11,459,589 B | 3,700,024 B | 3.10x smaller |

The binary file is smaller mostly because it does not keep repeating JSON field names. Each event is stored as a fixed 37-byte record.

## Benchmark results

Local BenchmarkDotNet run on Windows 10, Intel Core i7-6500U, .NET 10.0.8.

| Operation | Events | NDJSON | Binary |
| --------- | -----: | -----: | -----: |
| Write | 1,000 | 1.63 ms / 313.78 KB | 0.87 ms / 4.38 KB |
| Write | 10,000 | 10.02 ms / 3,055.98 KB | 4.35 ms / 4.38 KB |
| Write | 100,000 | 101.22 ms / 30,478.44 KB | 28.03 ms / 4.41 KB |
| Replay | 1,000 | 1.70 ms / 407.90 KB | 1.07 ms / 495.30 KB |
| Replay | 10,000 | 13.59 ms / 4,590.79 KB | 8.92 ms / 5,207.53 KB |
| Replay | 100,000 | 139.73 ms / 42,764.71 KB | 89.83 ms / 52,325.16 KB |

## What I found

Binary writing was faster and allocated much less memory.

Binary replay was also faster, but it allocated more memory than NDJSON replay. That was the useful part as it proved that smaller files did not automatically mean fewer allocations.

The likely issue is in my binary reader. It probably still creates allocations that could be avoided.

## What I learned

- How to model small immutable events in C#.
- How NDJSON and binary formats differ in practice.
- How to write and read a simple binary file format.
- Why deterministic input matters for benchmarks.
- How to use BenchmarkDotNet for timing and allocation measurements.
- Why performance work should be measured instead of guessed.

## Tech used

C#, .NET 10, xUnit, BenchmarkDotNet, System.Text.Json, BinaryWriter, BinaryReader.`,
    featured: true,
  },
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
    featured: true,
  },
];
