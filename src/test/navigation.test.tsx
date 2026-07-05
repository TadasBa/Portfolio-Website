import { screen } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("navigation", () => {
  it("renders the section nav", () => {
    renderApp();

    for (const label of ["Intro", "Work", "Blog", "About", "Contact"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("links blog entries to their post pages", () => {
    renderApp();

    const link = screen.getByRole("link", { name: /rebuilt this site/i });
    expect(link).toHaveAttribute("href", "/blog/rebuilt-this-site-14-times");
  });
});
