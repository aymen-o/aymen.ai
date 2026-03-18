export interface BlogPost {
	title: string;
	description: string;
	date: Date;
	tags: string[];
	draft: boolean;
	ogImage?: string;
}

export type ProjectStatus =
	| "active"
	| "shipped"
	| "sunset"
	| "building"
	| "employed"
	| "running"
	| "exited";

export interface Project {
	title: string;
	description: string;
	url?: string;
	repo?: string;
	status: ProjectStatus;
	tags: string[];
	order: number;
}
