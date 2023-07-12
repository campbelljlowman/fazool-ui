import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from 'vite-plugin-svgr'
import path from "path"

export default defineConfig({
    plugins: [react(), svgr()],
    test: {
        globals: true,
        environment: 'jsdom',
      },
    server: {
        host: true,
        strictPort: true,
        port: 5173, 
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    }
});