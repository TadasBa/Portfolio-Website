import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "vitest";
import { renderApp } from "./renderApp";

const imageProjectPath =
  "/projects/code-quality-assessment-using-large-language-models";
const imageCaption =
  "Experiment output and comparison workflow used in the thesis.";
const videoProjectPath = "/projects/3d-platformer-game-in-unity";
const videoCaption =
  "Custom camera orbit with mouse input and clamped vertical rotation.";

afterEach(() => {
  document.body.style.overflow = "";
});

async function openPreview(pathname: string, caption: string) {
  const user = userEvent.setup();

  renderApp([pathname]);

  const opener = await screen.findByRole("button", {
    name: `Open larger preview: ${caption}`,
  });

  await user.click(opener);

  const dialog = await screen.findByRole("dialog", {
    name: `Expanded media preview: ${caption}`,
  });

  return { dialog, opener, user };
}

describe("MediaLightbox", () => {
  it("opens an image preview with an accessible dialog name and description", async () => {
    const { dialog } = await openPreview(imageProjectPath, imageCaption);

    expect(dialog).toHaveAccessibleName(
      `Expanded media preview: ${imageCaption}`,
    );
    expect(dialog).toHaveAccessibleDescription(imageCaption);
  });

  it("opens a video preview with media-correct close wording", async () => {
    const { dialog } = await openPreview(videoProjectPath, videoCaption);

    expect(dialog).toHaveAccessibleName(
      `Expanded media preview: ${videoCaption}`,
    );
    expect(
      within(dialog).getAllByRole("button", { name: "Close media preview" }),
    ).toHaveLength(2);
    expect(
      within(dialog).queryByRole("button", { name: "Close image preview" }),
    ).not.toBeInTheDocument();
  });

  it("moves focus to the close control after opening", async () => {
    const { dialog } = await openPreview(imageProjectPath, imageCaption);

    expect(document.activeElement).toBe(
      within(dialog).getAllByRole("button", {
        name: "Close media preview",
      })[1],
    );
  });

  it("closes with Escape and restores focus to the gallery button", async () => {
    const { opener, user } = await openPreview(imageProjectPath, imageCaption);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(opener).toHaveFocus();
  });

  it("closes when the backdrop is clicked", async () => {
    const { dialog, user } = await openPreview(imageProjectPath, imageCaption);

    await user.click(
      within(dialog).getAllByRole("button", {
        name: "Close media preview",
      })[0],
    );

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when the close button is clicked and restores scroll locking", async () => {
    document.body.style.overflow = "visible";

    const { dialog, opener, user } = await openPreview(
      imageProjectPath,
      imageCaption,
    );

    expect(document.body.style.overflow).toBe("hidden");

    await user.click(
      within(dialog).getAllByRole("button", {
        name: "Close media preview",
      })[1],
    );

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe("visible");
    expect(opener).toHaveFocus();
  });

  it("keeps Tab and Shift+Tab focus inside the modal", async () => {
    const { dialog, user } = await openPreview(imageProjectPath, imageCaption);
    const closeButton = within(dialog).getAllByRole("button", {
      name: "Close media preview",
    })[1];

    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(closeButton).toHaveFocus();
  });
});
