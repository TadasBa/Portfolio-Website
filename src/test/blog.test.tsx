import { screen } from "@testing-library/react";
import { renderApp } from "./renderApp";

describe("blog", () => {
  it("renders a post page", async () => {
    renderApp(["/blog/rebuilt-this-site-14-times"]);

    expect(
      await screen.findByRole("heading", {
        name: /rebuilt this site 14 times/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/stood still/i)).toBeInTheDocument();
  });

  it("shows a not-found state for an unknown slug", async () => {
    renderApp(["/blog/does-not-exist"]);

    expect(await screen.findByText(/Not written yet/i)).toBeInTheDocument();
  });
});
