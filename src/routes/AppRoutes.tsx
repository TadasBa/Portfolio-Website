import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { AboutPage } from "../pages/AboutPage";
import { BlogPage } from "../pages/BlogPage";
import { BlogPostPage } from "../pages/BlogPostPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { StackPage } from "../pages/StackPage";

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
      </motion.div>
    </AnimatePresence>
  );
}
