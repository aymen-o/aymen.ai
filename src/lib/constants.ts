export const SITE = {
	title: "Aymen El Akbari",
	description:
		"Full-stack developer & entrepreneur building AI products from Quebec City.",
	url: "https://aymen.ai",
} as const;

export const AUTHOR = {
	name: "Aymen El Akbari",
	nameArabic: "أيمن الأكبري",
	role: "Full-Stack Developer & Entrepreneur",
	location: "Quebec City, Canada",
	github: "aymen-o",
} as const;

export interface SocialLink {
	name: string;
	url: string;
	icon: string;
	disabled?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/aymen-el-akbari/",
		icon: "linkedin",
	},
	{ name: "X", url: "https://x.com/aymenakx", icon: "x" },
	{ name: "GitHub", url: "https://github.com/aymen-o", icon: "github" },
	// { name: 'Instagram', url: '#', icon: 'instagram', disabled: true },
	// { name: 'YouTube', url: '#', icon: 'youtube', disabled: true },
];

export interface NavItem {
	label: string;
	href: string;
	shortcut: string;
}

export const NAV_ITEMS: NavItem[] = [
	{ label: "home", href: "/", shortcut: "h" },
	{ label: "about", href: "/about", shortcut: "a" },
	{ label: "blog", href: "/blog", shortcut: "b" },
	{ label: "projects", href: "/projects", shortcut: "p" },
];
