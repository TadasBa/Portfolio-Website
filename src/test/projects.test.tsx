import { screen } from "@testing-library/react";
import { projectsByDate } from "../content/projects/projects";
import { renderApp } from "./renderApp";

describe("Projects", () => {
  it("renders project cards from content data", async () => {
    renderApp(["/projects"]);

    expect(
      await screen.findByRole("heading", { name: projectsByDate[0].title }),
    ).toBeInTheDocument();

    projectsByDate.forEach((project) => {
      expect(
        screen.getByRole("heading", { name: project.title }),
      ).toBeInTheDocument();
    });
  });

  it("shows a not-found state for an invalid project slug", async () => {
    renderApp(["/projects/not-a-real-project"]);

    expect(await screen.findByText(/Project not found/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to projects/i }),
    ).toBeInTheDocument();
  });

  it("renders a project detail page from content data", async () => {
    const [project] = projectsByDate;

    renderApp([`/projects/${project.slug}`]);

    expect(
      await screen.findByRole("heading", { name: project.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(project.problem)).toBeInTheDocument();
    expect(screen.getByText(project.solution)).toBeInTheDocument();
  });
});
