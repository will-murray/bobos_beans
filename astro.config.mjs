// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://bobosbeans.ca',
  // Server-rendered by default so every route can query the Shopify Storefront API
  // per request. Swap the adapter for the deploy target later (e.g. @astrojs/vercel).
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
