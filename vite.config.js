import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function makePhpProxy() {
  return {
    target: "http://localhost",
    changeOrigin: true,
    rewrite: (path) => `/Ledgerworx-web${path}`,
  };
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy only dynamic PHP endpoints; let Vite serve static files directly.
      "/accountant-n/php": makePhpProxy(),
      "/client/client-php": makePhpProxy(),
      "/accountant-payroll.php": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: () => "/Ledgerworx-web/accountant-payroll.php",
      },
      "/accountant-tasks-details.php": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: () => "/Ledgerworx-web/accountant-tasks-details.php",
      },
    },
  },
});
