import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    open: true,
    port: 3000,
    host: true,
  },
  
  preview: {
    port: 3000,
  },
  
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-mantine": ["@mantine/core", "@mantine/hooks", "@mantine/form"],
          "vendor-mantine-ext": ["@mantine/dates", "@mantine/notifications", "@mantine/dropzone", "@mantine/carousel"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-i18n": ["i18next", "react-i18next"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/features": path.resolve(__dirname, "src/features"),
      "@/shared": path.resolve(__dirname, "src/shared"),
      "@/core": path.resolve(__dirname, "src/core"),
      "@/config": path.resolve(__dirname, "src/config"),
      "@/constants": path.resolve(__dirname, "src/constants"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/assets": path.resolve(__dirname, "src/assets"),
    },
  },
  
  css: {
    preprocessorOptions: {},
    devSourcemap: true,
  },
  
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/form",
      "@mantine/dates",
      "@mantine/notifications",
      "@mantine/dropzone",
      "@mantine/carousel",
      "@tabler/icons-react",
      "@tanstack/react-query",
      "zustand",
      "axios",
      "dayjs",
      "i18next",
      "react-i18next",
    ],
  },
  
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/mocks/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/types/**",
      ],
    },
  },
});
