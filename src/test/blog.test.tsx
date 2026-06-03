import { screen } from "@testing-library/react";
import { blogPostsByDate } from "../content/blog/posts";
import { renderApp } from "./renderApp";

describe("Blog", () => {
  it("renders blog cards from content data", async () => {
    renderApp(["/blog"]);

    expect(
      await screen.findByRole("heading", { name: blogPostsByDate[0].title }),
    ).toBeInTheDocument();

    blogPostsByDate.forEach((post) => {
      expect(
        screen.getByRole("heading", { name: post.title }),
      ).toBeInTheDocument();
    });
  });

  it("shows a not-found state for an invalid blog slug", async () => {
    renderApp(["/blog/not-a-real-post"]);

    expect(await screen.findByText(/Blog post not found/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to blog/i }),
    ).toBeInTheDocument();
  });

  it("renders a blog detail page from content data", async () => {
    const [post] = blogPostsByDate;

    renderApp([`/blog/${post.slug}`]);

    expect(
      await screen.findByRole("heading", { name: post.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/learning how to learn all over again/i),
    ).toBeInTheDocument();
  });
});
