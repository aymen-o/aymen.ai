import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const language = z.enum(['en', 'fr', 'ar']);

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		locale: language.default('en'),
		translationKey: z.string(),
		url: z.url().optional(),
		repo: z.url().optional(),
		status: z.enum(['active', 'shipped', 'past', 'sunset', 'building', 'employed', 'running', 'exited']),
		tags: z.array(z.string()).default([]),
		order: z.number(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { projects };
