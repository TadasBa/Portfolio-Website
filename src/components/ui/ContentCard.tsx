import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./ContentCard.module.scss";

type ContentCardProps = {
  children: ReactNode;
  className?: string;
};

export function ContentCard({ children, className }: ContentCardProps) {
  return <div className={cx(styles.card, className)}>{children}</div>;
}
