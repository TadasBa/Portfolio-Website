import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const targets = ["coverage", "dist", "playwright-report", "test-results"];

await Promise.all(
  targets.map((target) =>
    rm(resolve(process.cwd(), target), { force: true, recursive: true }),
  ),
);
