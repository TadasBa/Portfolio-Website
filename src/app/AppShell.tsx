import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FolderFrame } from "../components/layout/FolderFrame";
import { AppRoutes } from "../routes/AppRoutes";
import styles from "./AppShell.module.scss";

function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.slice(1);

      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });

      return;
    }

    const folderViewport = document.querySelector<HTMLElement>("main > div");

    if (folderViewport) {
      folderViewport.scrollTop = 0;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.hash, location.pathname]);

  return null;
}

export function AppShell() {
  return (
    <div className={styles.shell}>
      <RouteScrollManager />
      <FolderFrame>
        <AppRoutes />
      </FolderFrame>
    </div>
  );
}
