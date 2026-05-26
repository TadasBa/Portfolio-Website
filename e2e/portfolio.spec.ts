import { expect, test } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Tadas Baltrūnas/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("main").getByRole("link", { name: /View projects/i }),
  ).toBeVisible();
});

test("navigation works", async ({ page }) => {
  await page.goto("/projects");
  await page
    .getByLabel("Primary")
    .getByRole("link", { name: /^Stack$/i })
    .click();

  await expect(page).toHaveURL(/\/stack$/);
  await expect(
    page.getByRole("heading", {
      name: /Tools I use/i,
    }),
  ).toBeVisible();
});

test("projects page and detail page work", async ({ page }) => {
  await page.goto("/projects");

  await page
    .getByRole("link", {
      name: /Code Quality Assessment Using Large Language Models/i,
    })
    .click();

  await expect(page).toHaveURL(
    /\/projects\/code-quality-assessment-using-large-language-models$/,
  );
  await expect(
    page.getByText(/Compare LLM-based code quality assessment/i),
  ).toBeVisible();
});

test("blog page and detail page work", async ({ page }) => {
  await page.goto("/blog");

  await page
    .getByRole("link", { name: /Software Engineering at Vilnius University/i })
    .click();

  await expect(page).toHaveURL(
    /\/blog\/software-engineering-at-vilnius-university$/,
  );
  await expect(
    page.getByText(/First year: learning how to study/i),
  ).toBeVisible();
});

test("mobile viewport smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /^About$/i })).toBeVisible();
  await expect(page.getByText(/Developer focused on frontend/i)).toBeVisible();
});
