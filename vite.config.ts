import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/study-cafe-guides-75/", // Corrected base path for GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Ensure build output is in the correct directory
    emptyOutDir: true, // Clears old files before building
    rollupOptions: {
      input: { // Explicitly define entry points
        main: "src/main.tsx"
      },
      output: {
        entryFileNames: "assets/index.js", // Ensure predictable output
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      }
    },
    manifest: true, // Generates a manifest.json for debugging
  }
}));