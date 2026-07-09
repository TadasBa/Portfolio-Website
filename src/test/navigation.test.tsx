import { screen } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("navigation", () => {
  it("renders the section nav", () => {
    renderApp();

    for (const label of ["Home", "Work", "Blog", "About", "Contact"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("links blog entries to their post pages", () => {
    renderApp();

    const link = screen.getByRole("link", { name: /placeholder post one/i });
    expect(link).toHaveAttribute("href", "/blog/placeholder-1");
  });
});
