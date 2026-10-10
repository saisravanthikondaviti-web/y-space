/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const configWrapper = path.join(root, "next.config.ts");

if (!fs.existsSync(configWrapper)) {
  console.log("[Hostinger fix] next.config.ts not found. Nothing to patch.");
  process.exit(0);
}

const files = fs
  .readdirSync(root)
  .filter((file) => file.endsWith(".next.config.ts"));

if (files.length === 0) {
  console.log("[Hostinger fix] No Hostinger generated config found.");
  process.exit(0);
}

const generatedConfig = files[0];

console.log(`[Hostinger fix] Found generated config: ${generatedConfig}`);

let wrapper = fs.readFileSync(configWrapper, "utf8");

const withoutExtension = generatedConfig.replace(/\.ts$/, "");

wrapper = wrapper.replace(
  new RegExp(`(["'])\\./${withoutExtension}\\1`),
  `"./${generatedConfig}"`
);

fs.writeFileSync(configWrapper, wrapper);

console.log(
  `[Hostinger fix] Fixed import: ./${withoutExtension} -> ./${generatedConfig}`
);

const generatedPath = path.join(root, generatedConfig);

let config = fs.readFileSync(generatedPath, "utf8");

if (!config.includes("useWasmBinary")) {
  config = config.replace(
    /const nextConfig: NextConfig = \{/,
    `const nextConfig: NextConfig = {
  experimental: {
    useWasmBinary: true,
    cpus: 1,
  },`
  );
}

fs.writeFileSync(generatedPath, config);

console.log("[Hostinger fix] Enabled WASM SWC and cpus=1.");
console.log("[Hostinger fix] Hostinger config repair complete.");