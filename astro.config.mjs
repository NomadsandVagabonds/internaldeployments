// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://internaldeployments.ai',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
