import { screen } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("App", () => {
  it("renders the layout", () => {
    renderApp();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the homepage hero", () => {
    renderApp();

    expect(
      screen.getByRole("heading", { name: /Tadas Baltrūnas/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Developer focused on frontend, automation, and practical systems/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the 404 page", () => {
    renderApp(["/missing-page"]);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back home/i }),
    ).toBeInTheDocument();
  });
});
