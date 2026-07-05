import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

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

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<BlogPostPage />} path="/blog/:slug" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
}
