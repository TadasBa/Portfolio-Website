import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

const AboutPage = lazy(() =>
  import("../pages/AboutPage").then((module) => ({
    default: module.AboutPage,
  })),
);
const BlogPage = lazy(() =>
  import("../pages/BlogPage").then((module) => ({
    default: module.BlogPage,
  })),
);
const BlogPostPage = lazy(() =>
  import("../pages/BlogPostPage").then((module) => ({
    default: module.BlogPostPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
);
const ProjectDetailPage = lazy(() =>
  import("../pages/ProjectDetailPage").then((module) => ({
    default: module.ProjectDetailPage,
  })),
);
const ProjectsPage = lazy(() =>
  import("../pages/ProjectsPage").then((module) => ({
    default: module.ProjectsPage,
  })),
);
const StackPage = lazy(() =>
  import("../pages/StackPage").then((module) => ({
    default: module.StackPage,
  })),
);

export function AppRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        key={location.pathname}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutPage />} path="/about" />
            <Route element={<ProjectsPage />} path="/projects" />
            <Route element={<ProjectDetailPage />} path="/projects/:slug" />
            <Route element={<BlogPage />} path="/blog" />
            <Route element={<BlogPostPage />} path="/blog/:slug" />
            <Route element={<StackPage />} path="/stack" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
