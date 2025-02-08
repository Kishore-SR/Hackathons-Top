import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Top Hackathons",
        short_name: "Hackathons",
        description: "Explore and participate in hackathons easily.",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
  server: {
    open: true,
  },
  build: {
    manifest: true,
  },
});
