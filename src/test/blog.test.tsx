import { screen } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("blog", () => {
  it("renders a post page", async () => {
    renderApp(["/blog/placeholder-1"]);

    expect(
      await screen.findByRole("heading", {
        name: /placeholder post one/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/real content is on its way/i)).toBeInTheDocument();
  });

  it("shows a not-found state for an unknown slug", async () => {
    renderApp(["/blog/does-not-exist"]);

    expect(await screen.findByText(/Not written yet/i)).toBeInTheDocument();
  });
});
