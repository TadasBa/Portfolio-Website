import { screen, within } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("Navigation", () => {
  it("renders the main navigation links", () => {
    renderApp();

    const primaryNav = screen.getByRole("navigation", { name: /Primary/i });

    expect(primaryNav).toBeInTheDocument();
    expect(
      within(primaryNav).getByRole("link", { name: /^Home$/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNav).getByRole("link", { name: /^Projects$/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNav).getByRole("link", { name: /^Blog$/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNav).getByRole("link", { name: /^Stack$/i }),
    ).toBeInTheDocument();
    expect(
      within(primaryNav).getByRole("link", { name: /^About$/i }),
    ).toBeInTheDocument();
  });
});
