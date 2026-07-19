// One-off: optimize the captured client-site screenshots into shippable webp.
// Source captures live in design-explorations/shots (full-page, too heavy to ship).
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "design-explorations/shots");
const out = resolve(root, "src/assets/media/work");

const jobs = [
  { in: "seimos-full-lite.png", out: "seimos.webp" },
  { in: "cechas-full-lite.png", out: "cechas.webp" },
  { in: "rethread-full-lite.png", out: "rethread.webp" },
];

for (const j of jobs) {
  await sharp(resolve(src, j.in))
    .resize({ width: 760, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(resolve(out, j.out));
  console.log("wrote", j.out);
}
