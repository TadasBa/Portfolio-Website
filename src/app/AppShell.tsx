import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export function AppShell() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <AppRoutes />
    </>
  );
}
