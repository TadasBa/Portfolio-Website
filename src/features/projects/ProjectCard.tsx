import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentCard } from "../../components/ui/ContentCard";
import { Tag } from "../../components/ui/Tag";
import type { ProjectEntry } from "../../types/content";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link className={styles.link} to={`/projects/${project.slug}`}>
      <ContentCard className={styles.card}>
        <div className={styles.top}>
          <h3 className={styles.title}>{project.title}</h3>
        </div>

        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className={styles.bottom}>
          <span className={styles.date}>{project.dateLabel}</span>
          <span className={styles.cta}>
            View project
            <ArrowUpRight className={styles.icon} />
          </span>
        </div>
      </ContentCard>
    </Link>
  );
}
