import { cx } from "../../utils/cx";
import styles from "./Tag.module.scss";

type TagProps = {
  children: string;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return <span className={cx(styles.tag, className)}>{children}</span>;
}
