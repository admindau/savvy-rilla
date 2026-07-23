import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = process.cwd();
const openNext = resolve(root, ".open-next");
const dist = resolve(root, "dist");

rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, "server"), { recursive: true });
mkdirSync(resolve(dist, "server", "open-next"), { recursive: true });
mkdirSync(resolve(dist, "assets"), { recursive: true });

execFileSync("cp", [
  "-RL",
  `${openNext}/.`,
  resolve(dist, "server", "open-next"),
]);
rmSync(resolve(dist, "server", "open-next", "assets"), {
  recursive: true,
  force: true,
});

const sourceModules = resolve(
  openNext,
  "server-functions",
  "default",
  "node_modules",
);
const targetModules = resolve(
  dist,
  "server",
  "open-next",
  "server-functions",
  "default",
  "node_modules",
);

rmSync(targetModules, { recursive: true, force: true });
mkdirSync(targetModules, { recursive: true });

for (const packageName of ["next", "react", "react-dom"]) {
  execFileSync("cp", [
    "-RL",
    resolve(sourceModules, packageName),
    resolve(targetModules, packageName),
  ]);
}

execFileSync("cp", [
  "-RL",
  `${resolve(openNext, "assets")}/.`,
  resolve(dist, "assets"),
]);

writeFileSync(
  resolve(dist, "server", "index.js"),
  [
    'export { default } from "./open-next/worker.js";',
    'export * from "./open-next/worker.js";',
    "",
  ].join("\n"),
);
