import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const viewports = [
  { name: "large desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

async function expectNoHorizontalScroll(page: Page) {
  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(hasHorizontalScroll).toBe(false);
}

test("homepage loads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /focused on the frontend/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Work" })).toBeVisible();
});

test("selected work links to the live sites", async ({ page }) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: /Šeimos idėjų centras/i });
  await expect(link).toHaveAttribute(
    "href",
    "https://seimos-ideju-centras.pages.dev/",
  );
  await expect(link).toHaveAttribute("target", "_blank");
});

test("blog post page renders", async ({ page }) => {
  await page.goto("/blog/rebuilt-this-site-14-times");

  await expect(
    page.getByRole("heading", { name: /rebuilt this site 14 times/i }),
  ).toBeVisible();
  await expect(page.getByText(/stood still/i)).toBeVisible();
});

test("unknown route shows the not-found state", async ({ page }) => {
  await page.goto("/does-not-exist");

  await expect(page.getByText(/Off the stage/i)).toBeVisible();
});

for (const viewport of viewports) {
  test(`no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /focused on the frontend/i }),
    ).toBeVisible();
    await expectNoHorizontalScroll(page);

    await page.goto("/blog/rebuilt-this-site-14-times");
    await expect(
      page.getByRole("heading", { name: /rebuilt this site 14 times/i }),
    ).toBeVisible();
    await expectNoHorizontalScroll(page);
  });
}
