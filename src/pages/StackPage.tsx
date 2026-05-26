import { Box, Braces, Code2, GitBranch, Plug, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { skillGroups } from "../content/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./StackPage.module.scss";

const groupIcons: Record<string, LucideIcon> = {
  "APIs and integrations": Plug,
  Frontend: Code2,
  Languages: Braces,
  Quality: ShieldCheck,
  Systems: Box,
  Tools: GitBranch,
};

export function StackPage() {
  useDocumentMeta({
    title: "Stack",
    description: "Tools and systems used by Tadas Baltrunas.",
  });

  return (
    <section className={styles.page}>
      <SectionHeading eyebrow="Stack" title="Tools I use." />

      <div className={styles.grid}>
        {skillGroups.map((group) => {
          const Icon = groupIcons[group.title] ?? Code2;

          return (
            <section className={styles.group} key={group.title}>
              <div className={styles.icon}>
                <Icon aria-hidden="true" />
              </div>
              <h2>{group.title}</h2>
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
