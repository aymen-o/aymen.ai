import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://aymen.ca',
	trailingSlash: 'always',
	integrations: [sitemap({
		i18n: {
			defaultLocale: 'en',
			locales: { en: 'en-CA', fr: 'fr-CA', ar: 'ar' },
		},
	})],
	output: 'static',
	// Monochrome code blocks do not need generated syntax-highlighting styles.
	markdown: { syntaxHighlight: false },
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"base-uri 'self'",
				"object-src 'none'",
				"form-action 'none'",
				"frame-src 'none'",
				"connect-src 'self'",
				"img-src 'self' data:",
				"font-src 'self'",
			],
			styleDirective: {
				resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }],
			},
		},
	},
	vite: {
		plugins: [tailwindcss()],
		build: { sourcemap: false },
	},
});
