import { SectionContainer } from "../components/layout/SectionContainer";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projectsByDate } from "../content/projects/projects";
import { ProjectCard } from "../features/projects/ProjectCard";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./ListPage.module.scss";

export function ProjectsPage() {
  useDocumentMeta({
    title: "Projects",
    description:
      "Projects from frontend development, software engineering studies, and technical experiments.",
  });

  return (
    <SectionContainer className={styles.page}>
      <SectionHeading
        description="A small archive of projects from frontend development, software engineering studies, and technical experiments."
        eyebrow="Projects"
        title="Engineering work and experiments."
      />

      <div className={`${styles.grid} ${styles.projectGrid}`}>
        {projectsByDate.map((project, index) => (
          <Reveal delay={index * 0.05} key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
