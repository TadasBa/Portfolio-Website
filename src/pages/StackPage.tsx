import { Box, Code2, Server, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCloudflarepages,
  SiDocker,
  SiGit,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiN8N,
  SiPostman,
  SiPython,
  SiReact,
  SiSass,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from "react-icons/si";
import { TbApi, TbDatabase, TbWebhook } from "react-icons/tb";
import { SectionHeading } from "../components/ui/SectionHeading";
import { requireRouteMetadata } from "../content/routeMetadata";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./StackPage.module.scss";

type StackRow = {
  description: string;
  icon: LucideIcon;
  skills: {
    color: string;
    icon: IconType;
    label: string;
  }[];
  title: string;
};

const stackRows: StackRow[] = [
  {
    title: "Frontend",
    description: "Development and design",
    icon: Code2,
    skills: [
      { color: "#61dafb", icon: SiReact, label: "React" },
      { color: "#3178c6", icon: SiTypescript, label: "TypeScript" },
      { color: "#f7df1e", icon: SiJavascript, label: "JavaScript" },
      { color: "#e34f26", icon: SiHtml5, label: "HTML" },
      { color: "#cc6699", icon: SiSass, label: "SCSS" },
      { color: "#06b6d4", icon: SiTailwindcss, label: "Tailwind CSS" },
      { color: "#21759b", icon: SiWordpress, label: "WordPress" },
    ],
  },
  {
    title: "Backend & APIs",
    description: "Backend, API and data",
    icon: Server,
    skills: [
      { color: "#512bd4", icon: SiSharp, label: "C#" },
      { color: "#3776ab", icon: SiPython, label: "Python" },
      { color: "#336791", icon: TbDatabase, label: "SQL" },
      { color: "#0081a7", icon: TbApi, label: "REST APIs" },
      { color: "#ff6c37", icon: SiPostman, label: "Postman" },
    ],
  },
  {
    title: "Automation",
    description: "Workflow automations",
    icon: Zap,
    skills: [
      { color: "#ea4b71", icon: SiN8N, label: "n8n" },
      { color: "#0081a7", icon: TbWebhook, label: "Webhooks" },
    ],
  },
  {
    title: "Delivery",
    description: "Version control and deployment",
    icon: Box,
    skills: [
      { color: "#f05032", icon: SiGit, label: "Git" },
      { color: "#fc6d26", icon: SiGitlab, label: "GitLab CI/CD" },
      { color: "#2496ed", icon: SiDocker, label: "Docker" },
      { color: "#f38020", icon: SiCloudflarepages, label: "Cloudflare Pages" },
    ],
  },
];

export function StackPage() {
  useDocumentMeta(requireRouteMetadata("/stack"));

  return (
    <section className={styles.page}>
      <SectionHeading
        description="Technologies and tools I work with"
        eyebrow="Stack"
        title="Tech Stack"
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
                  <span key={skill.label}>
                    <skill.icon
                      aria-hidden="true"
                      style={{ color: skill.color }}
                    />
                    {skill.label}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
