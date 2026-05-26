import { cx } from "../../utils/cx";
import styles from "./SectionHeading.module.scss";

type SectionHeadingProps = {
  description?: string;
  eyebrow?: string;
  title: string;
};

export function SectionHeading({
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={cx(styles.title, !eyebrow && styles.titleNoEyebrow)}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
