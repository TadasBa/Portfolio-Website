import { Box, Code2, Server, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./StackPage.module.scss";

type StackRow = {
  description: string;
  icon: LucideIcon;
  skills: string[];
  title: string;
};

const stackRows: StackRow[] = [
  {
    title: "Frontend",
    description: "Building user interfaces that are fast and intuitive.",
    icon: Code2,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "Tailwind CSS",
      "WordPress",
    ],
  },
  {
    title: "Backend",
    description: "APIs, databases, and server-side logic.",
    icon: Server,
    skills: ["Node.js", "Python", "C#", "SQL", "REST APIs", "Postman"],
  },
  {
    title: "Automation",
    description: "Workflow automation and CI/CD.",
    icon: Zap,
    skills: ["n8n", "Docker", "GitLab CI/CD"],
  },
  {
    title: "Tools",
    description: "Everyday tools that help me build and ship.",
    icon: Box,
    skills: ["Git", "Docker", "Jira", "YouTrack", "Nextcloud", "Figma"],
  },
];

export function StackPage() {
  useDocumentMeta({
    title: "Stack",
    description: "Technologies and tools used by Tadas Baltrunas.",
  });

  return (
    <section className={styles.page}>
      <SectionHeading
        description="Technologies and tools I work with."
        eyebrow="Tech stack"
        title="Stack"
      />

      <div className={styles.grid}>
        {stackRows.map((group) => {
          const Icon = group.icon;

          return (
            <section className={styles.group} key={group.title}>
              <div className={styles.icon}>
                <Icon aria-hidden="true" />
              </div>
              <div className={styles.groupText}>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className={styles.tags}>
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
