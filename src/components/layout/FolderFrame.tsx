import {
  BookOpenText,
  Code2,
  Folder,
  Home,
  Menu,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cx } from "../../utils/cx";
import styles from "./FolderFrame.module.scss";

const tabs = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Folder, label: "Projects", to: "/projects" },
  { icon: BookOpenText, label: "Blog", to: "/blog" },
  { icon: Code2, label: "Stack", to: "/stack" },
  { icon: UserRound, label: "About", to: "/about" },
];

type FolderFrameProps = {
  children: ReactNode;
};

function isActiveTab(pathname: string, to: string) {
  if (to === "/") {
    return pathname === "/";
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

export function FolderFrame({ children }: FolderFrameProps) {
  const location = useLocation();
  const isStaticPage = location.pathname === "/" || location.pathname === "/about";

  return (
    <div className={styles.frame}>
      <header>
        <nav aria-label="Primary" className={styles.tabs}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActiveTab(location.pathname, tab.to);
            const className = cx(styles.tab, active && styles.active);

            return (
              <NavLink className={className} key={tab.label} to={tab.to}>
                <Icon aria-hidden="true" />
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </header>

      <div className={styles.folder}>
        <aside aria-hidden="true" className={styles.spine}>
          <span className={styles.marker} />
          <span className={styles.spineText}> ~/tadas/portfolio </span>
          <span className={styles.spineMenu}>
            <Menu />
          </span>
        </aside>
        <span aria-hidden="true" className={styles.shadowStrip} />
        <main className={styles.surface}>
        <div className={cx(styles.surfaceInner, isStaticPage && styles.noScroll)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
