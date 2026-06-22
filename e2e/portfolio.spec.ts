import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const responsiveViewports = [
  { height: 900, name: "large desktop", width: 1440 },
  { height: 768, name: "laptop", width: 1366 },
  { height: 720, name: "compact laptop", width: 1280 },
  { height: 768, name: "tablet landscape", width: 1024 },
  { height: 1024, name: "tablet portrait", width: 768 },
  { height: 844, name: "mobile", width: 390 },
  { height: 667, name: "small mobile", width: 375 },
];

async function expectNoHorizontalPageScroll(page: Page) {
  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  expect(hasHorizontalScroll).toBe(false);
}

async function expectNoMainInternalScroll(page: Page) {
  const hasInternalScroll = await page
    .locator("main > div")
    .evaluate((element) => element.scrollHeight > element.clientHeight + 1);

  expect(hasInternalScroll).toBe(false);
}

async function expectFrameSpacing(page: Page, viewportWidth: number) {
  const frameLeft = await page
    .getByRole("main")
    .evaluate(
      (main) => main.parentElement?.parentElement?.getBoundingClientRect().left,
    );

  expect(frameLeft ?? 0).toBeGreaterThanOrEqual(
    viewportWidth >= 1280 ? 47 : 31,
  );
}

async function expectTabsAlignWithPanel(page: Page) {
  const isAligned = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Primary"]');
    const main = document.querySelector("main");

    if (!nav || !main) {
      return false;
    }

    const navRect = nav.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();

    return (
      Math.abs(navRect.left - mainRect.left) <= 2 &&
      Math.abs(navRect.right - mainRect.right) <= 2
    );
  });

  expect(isAligned).toBe(true);
}

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
      name: /^Tech Stack$/i,
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
    page.getByText(/LLMs showed real potential as supplementary/i),
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
    page.getByRole("heading", { name: /^First year$/i }),
  ).toBeVisible();
});

test("mobile viewport smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /^About$/i })).toBeVisible();
  await expect(
    page.getByText(/I work on practical web projects/i),
  ).toBeVisible();
});

for (const viewport of responsiveViewports) {
  test(`home responsive layout at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Tadas Baltrūnas/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: /View projects/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: /Read Blog/i }),
    ).toBeVisible();
    await expectNoHorizontalPageScroll(page);
    await expectTabsAlignWithPanel(page);

    if (viewport.width >= 1024) {
      await expectNoMainInternalScroll(page);
      await expectFrameSpacing(page, viewport.width);
    }
  });

  test(`about responsive layout at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto("/about");

    await expect(
      page.getByRole("heading", { name: /What I am up to/i }),
    ).toBeVisible();
    await expect(
      page.getByAltText(/Portrait of Tadas Baltrūnas/i),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /GitHub/i })).toBeVisible();
    await expectNoHorizontalPageScroll(page);
    await expectTabsAlignWithPanel(page);

    if (viewport.width >= 1024) {
      await expectNoMainInternalScroll(page);
      await expectFrameSpacing(page, viewport.width);
    }
  });
}

for (const viewport of responsiveViewports) {
  test(`content pages do not overflow at ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    for (const path of ["/projects", "/blog", "/stack", "/about"]) {
      await page.goto(path);

      await expect(page.getByRole("link", { name: /^Home$/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /^About$/i })).toBeVisible();
      await expectNoHorizontalPageScroll(page);
      await expectTabsAlignWithPanel(page);
    }
  });
}
