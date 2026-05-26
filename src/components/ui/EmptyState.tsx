import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { ContentCard } from "./ContentCard";
import styles from "./EmptyState.module.scss";

type EmptyStateProps = {
  actionLabel?: string;
  actionTo?: string;
  description: string;
  icon?: ReactNode;
  title: string;
};

export function EmptyState({
  actionLabel,
  actionTo,
  description,
  icon,
  title,
}: EmptyStateProps) {
  return (
    <ContentCard className={styles.state}>
      <div className={styles.icon}>{icon ?? <ArrowRight />}</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {actionLabel && actionTo ? (
        <ButtonLink className={styles.action} to={actionTo} variant="secondary">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </ContentCard>
  );
}
