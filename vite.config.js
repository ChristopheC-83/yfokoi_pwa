import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // "generateSW" dit à Vite de créer lui-même le fichier sw.js
      strategy: "generateSW",
      registerType: "autoUpdate",
      injectRegister: "inline", // Injecte le script d'enregistrement direct dans ton index.html
      manifest: {
        name: "Yfokoi - Liste A Nous",
        short_name: "Yfokoi",
        description: "Ma liste partagée ultra rapide",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone", // CRUCIAL pour ne pas avoir de "raccourci"
        start_url: "/index.html",
        scope: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Force la mise en cache pour le mode offline
        globPatterns: ["**/*.{js,css,html,ico,png,svg, jpg, jpeg}"],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
