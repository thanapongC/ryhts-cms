// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  site: process.env.SITE_URL || "https://ryhts-ribbon.com",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/api/"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        const path = new URL(item.url).pathname;
        // Higher priority for important pages
        if (path === "/" || path === "") {
          item.priority = 1.0;
          item.changefreq = "daily";
        } else if (path === "/products/" || path === "/products") {
          item.priority = 0.9;
          item.changefreq = "daily";
        } else if (path === "/articles/" || path === "/articles") {
          item.priority = 0.85;
          item.changefreq = "daily";
        } else if (path === "/about/" || path === "/about" || path === "/contact/" || path === "/contact") {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (path.includes("/privacy") || path.includes("/terms") || path.includes("/pdpa")) {
          item.priority = 0.3;
          item.changefreq = "yearly";
        } else if (path.startsWith("/products/")) {
          // Dynamic product pages - will be populated at build time if pre-rendered
          item.priority = 0.7;
          item.changefreq = "weekly";
        } else if (path.startsWith("/articles/")) {
          // Dynamic article pages
          item.priority = 0.7;
          item.changefreq = "weekly";
        }
        return item;
      },
    }),
  ],
  server: {
    port: 4321,
    host: true,
  },
});
