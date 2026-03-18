import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://aymen.ai',
	integrations: [mdx(), sitemap()],
	adapter: vercel({ webAnalytics: { enabled: true } }),
	output: 'static',
	vite: {
		plugins: [tailwindcss()],
	},
});
