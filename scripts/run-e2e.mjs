import { spawn } from "node:child_process";
import { resolve } from "node:path";
import process from "node:process";
import { createServer } from "vite";

const server = await createServer({
  configFile: resolve("vite.config.ts"),
  logLevel: "error",
  server: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
});

let shuttingDown = false;

async function closeServer() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  await server.close();
}

process.on("SIGINT", async () => {
  await closeServer();
  process.exit(130);
});

process.on("SIGTERM", async () => {
  await closeServer();
  process.exit(143);
});

await server.listen();

const playwrightCli = resolve("node_modules", "playwright", "cli.js");

const exitCode = await new Promise((resolveExitCode, reject) => {
  const child = spawn(process.execPath, [playwrightCli, "test"], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  });

  child.on("error", reject);
  child.on("exit", (code) => resolveExitCode(code ?? 1));
});

await closeServer();
process.exit(exitCode);
