
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import preload from "vite-plugin-preload";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    preload(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add build options for SSR
  // build: {
  //   ssr: command === 'build' && mode === 'production' ? '/src/entry-server.tsx' : undefined,
  //   outDir: command === 'build' && mode === 'production' ? 'dist/client' : 'dist',
  //   manifest: true,
  // }
}));
