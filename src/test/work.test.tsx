import { screen } from "@testing-library/react";
import { work } from "../content/work";
import { renderApp } from "./renderApp";

describe("work", () => {
  it("shows every selected project linking to its live site", () => {
    renderApp();

    for (const item of work) {
      const link = screen.getByRole("link", {
        name: new RegExp(item.title, "i"),
      });
      expect(link).toHaveAttribute("href", item.url);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });
});
