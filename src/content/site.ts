import type { SkillGroup, SocialLink } from "../types/content";

export const siteConfig = {
  name: "Tadas Baltrūnas",
  shortName: "Tadas",
  role: "Developer focused on frontend, automation, and practical systems.",
  summary: "Developer · Software Engineering MSc",
  email: "tadas@baltrunas.lt",
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/TadasBa",
    value: "github.com/TadasBa",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tadasba/",
    value: "linkedin.com/in/tadasba",
  },
  {
    label: "Email",
    href: "mailto:tadas@baltrunas.lt",
    value: "tadas@baltrunas.lt",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "C#", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Tailwind CSS",
      "WordPress",
      "Responsive UI",
      "Localization",
      "Accessibility basics",
    ],
  },
  {
    title: "APIs and integrations",
    skills: ["REST APIs", "Postman", "n8n", "Webhook flows", "Data mapping"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitLab CI/CD", "Docker", "Jira", "YouTrack", "VS Code"],
  },
  {
    title: "Systems",
    skills: [
      "Nextcloud",
      "Active Directory",
      "Zabbix",
      "CMS platforms",
      "Internal tools",
    ],
  },
  {
    title: "Quality",
    skills: ["Vitest", "Playwright", "ESLint", "Prettier", "Code review"],
  },
];
