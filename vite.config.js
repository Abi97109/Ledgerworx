import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const deploymentBasePath = process.env.VITE_APP_BASE_PATH || "/Admin-update/";

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

export default defineConfig(({ command }) => ({
  base: command === "build" ? deploymentBasePath : "/",
  plugins: [react(), apacheSpaFallbackPlugin]
}));
