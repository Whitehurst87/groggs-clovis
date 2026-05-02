// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.groggsclovis.com',
  trailingSlash: 'ignore',

  integrations: [
    react(),
    mdx(),
    sitemap(),
    // Run last — minify HTML / CSS / JS / SVG / images at build time.
    compress({
      HTML: true,
      CSS: true,
      JavaScript: true,
      SVG: true,
      Image: false, // Astro's <Image> handles raster optimization
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
