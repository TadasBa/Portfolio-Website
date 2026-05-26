import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cx } from "../../utils/cx";
import styles from "./ButtonLink.module.scss";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

type RouterButtonLinkProps = SharedProps & {
  href?: never;
  to: string;
};

type AnchorButtonLinkProps = SharedProps & {
  href: string;
  to?: never;
};

type ButtonLinkProps = RouterButtonLinkProps | AnchorButtonLinkProps;

export function ButtonLink(props: ButtonLinkProps) {
  const classes = cx(
    styles.button,
    props.variant === "secondary" ? styles.secondary : styles.primary,
    props.className,
  );

  if (props.to !== undefined) {
    return (
      <Link className={classes} to={props.to}>
        {props.children}
      </Link>
    );
  }

  return (
    <a className={classes} href={props.href} rel="noreferrer" target="_blank">
      {props.children}
    </a>
  );
}
