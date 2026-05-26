import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./SectionContainer.module.scss";

type SectionContainerProps = {
  as?: "article" | "div" | "section";
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionContainer({
  as: Component = "section",
  children,
  className,
  id,
}: SectionContainerProps) {
  return (
    <Component className={cx(styles.container, className)} id={id}>
      {children}
    </Component>
  );
}
