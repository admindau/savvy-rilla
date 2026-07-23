import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const openNext = resolve(root, ".open-next");
const dist = resolve(root, "dist");

rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, "server"), { recursive: true });
cpSync(openNext, resolve(dist, "open-next"), { recursive: true });
cpSync(resolve(openNext, "assets"), resolve(dist, "assets"), {
  recursive: true,
});

writeFileSync(
  resolve(dist, "server", "index.js"),
  [
    'export { default } from "../open-next/worker.js";',
    'export * from "../open-next/worker.js";',
    "",
  ].join("\n"),
);
