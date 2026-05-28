import { screen } from "@testing-library/react";
import { blogPostsByDate } from "../content/blog/posts";
import { renderApp } from "./renderApp";

describe("Blog", () => {
  it("renders blog cards from content data", () => {
    renderApp(["/blog"]);

    blogPostsByDate.forEach((post) => {
      expect(
        screen.getByRole("heading", { name: post.title }),
      ).toBeInTheDocument();
    });
  });

  it("shows a not-found state for an invalid blog slug", () => {
    renderApp(["/blog/not-a-real-post"]);

    expect(screen.getByText(/Blog post not found/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to blog/i }),
    ).toBeInTheDocument();
  });

  it("renders a blog detail page from content data", () => {
    const [post] = blogPostsByDate;

    renderApp([`/blog/${post.slug}`]);

    expect(
      screen.getByRole("heading", { name: post.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/learning how to learn all over again/i),
    ).toBeInTheDocument();
  });
});
