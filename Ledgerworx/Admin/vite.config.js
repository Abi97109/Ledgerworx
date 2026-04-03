import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

function normalizeDeploymentBasePath(basePath) {
  const normalizedBasePath = String(basePath ?? "").trim();

  if (normalizedBasePath === "" || normalizedBasePath === "/") {
    return "/";
  }

  return `/${normalizedBasePath.replace(/^\/+|\/+$/g, "")}/`;
}

const deploymentBasePath = normalizeDeploymentBasePath(process.env.VITE_APP_BASE_PATH);

const apacheSpaFallbackPlugin = {
  name: "apache-spa-fallback",
  closeBundle() {
    const sourcePath = fileURLToPath(new URL("./public/.htaccess", import.meta.url));
    const targetPath = fileURLToPath(new URL("./dist/.htaccess", import.meta.url));

    if (existsSync(sourcePath)) {
      copyFileSync(sourcePath, targetPath);
    }
  }
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = normalizeDeploymentBasePath(env.VITE_APP_BASE_PATH);

  return {
    base: command === "build" ? basePath : "/",
    plugins: [react(), apacheSpaFallbackPlugin]
  };
});
