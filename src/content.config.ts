import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		ogImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		url: z.string().optional(),
		repo: z.string().optional(),
		status: z.enum(['active', 'shipped', 'sunset', 'building', 'employed', 'running', 'exited']),
		tags: z.array(z.string()).default([]),
		order: z.number(),
	}),
});

export const collections = { blog, projects };
