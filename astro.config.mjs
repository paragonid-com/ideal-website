// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * Astro config.
 *
 * - `output: 'static'` зафиксирован явно. Без этого Cloudflare иногда тихо
 *   переключает деплой со static Pages на Workers SSR (см. HANDOFF — Deploy).
 * - `site` нужен для absolute URLs и будущего @astrojs/sitemap.
 *   ⚠️ Сейчас placeholder. После первого деплоя Cloudflare выдаст
 *   `<project-name>.pages.dev` — подставить сюда. После выдачи реального
 *   домена клиентом (idealmedwellness.com или иной) — поменять снова.
 */
export default defineConfig({
  output: 'static',
  site: 'https://idealmedical.com',
  integrations: [tailwind(), sitemap()],
});
