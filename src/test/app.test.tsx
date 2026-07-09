import { screen } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("App", () => {
  it("renders the layout landmarks", () => {
    renderApp();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the intro", () => {
    renderApp();

    expect(
      screen.getByRole("heading", { name: /focused on the frontend/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I design, build and ship web interfaces/i),
    ).toBeInTheDocument();
  });

  it("renders the 404 page", async () => {
    renderApp(["/missing-page"]);

    expect(await screen.findByText(/Off the stage/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to the start/i }),
    ).toBeInTheDocument();
  });
});
