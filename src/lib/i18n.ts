import type { ProjectStatus } from './types';

export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const localeNames: Record<Locale, string> = {
	en: 'English',
	fr: 'Français',
	ar: 'العربية',
};

export interface SiteCopy {
	nav: { home: string; about: string; blog: string; projects: string; label: string; openMenu: string; closeMenu: string; language: string };
	theme: { label: string; light: string; dark: string; system: string };
	common: { skipToContent: string; contact: string; source: string; backHome: string; allPosts: string; allProjects: string; readMore: string; updated: string; share: string; copyLink: string; copied: string; copyFailed: string };
	home: { description: string; role: string; intro: string; employerPrefix: string; location: string; aboutLink: string; writing: string; building: string };
	about: {
		title: string;
		description: string;
		intro: string[];
		workTitle: string;
		work: string[];
		skillsTitle: string;
		experienceTitle: string;
		experience: { company: string; role: string; period: string; description: string }[];
		educationTitle: string;
		education: { school: string; degree: string; period: string }[];
		languagesTitle: string;
		languages: string[];
		outsideTitle: string;
		outside: string[];
	};
	projects: { title: string; description: string };
	blog: { title: string; description: string; back: string; empty: string };
	notFound: { title: string; description: string };
	status: Record<ProjectStatus, string>;
}

const copy: Record<Locale, SiteCopy> = {
	en: {
		nav: { home: 'home', about: 'about', blog: 'notes', projects: 'projects', label: 'Main navigation', openMenu: 'Open menu', closeMenu: 'Close menu', language: 'Language' },
		theme: { label: 'Appearance', light: 'Light mode', dark: 'Dark mode', system: 'System theme' },
		common: { skipToContent: 'Skip to content', contact: 'Get in touch', source: 'Source', backHome: 'Back home', allPosts: 'All notes', allProjects: 'All projects', readMore: 'Read more', updated: 'Updated', share: 'Share', copyLink: 'Copy link', copied: 'Link copied', copyFailed: 'Could not copy. Copy the address from your browser.' },
		home: {
			description: 'Aymen El Akbari is a full-stack developer in Québec City, building internal tools, API integrations, and workflow automation at Eddyfi Technologies / ESAB.',
			role: 'Full-stack developer.',
			intro: 'Internal tools, API integrations, and workflow automation.',
			employerPrefix: 'Currently at',
			location: 'Québec City, Canada.',
			aboutLink: 'More about me',
			writing: 'notes',
			building: 'selected work',
		},
		about: {
			title: 'About',
			description: 'The background of Aymen El Akbari: full-stack development at Eddyfi Technologies / ESAB, Looka, Inworld AI, and Bloc Solutions, alongside entrepreneurship.',
			intro: ["I'm Aymen, a full-stack developer based in Québec City. I build internal tools, connect systems, and automate the work that gets in people's way."],
			workTitle: 'What I do',
			work: [
				'At Eddyfi Technologies / ESAB, I work on internal tools and web platforms, from requirements and implementation through deployment. My work includes API integrations, workflow automation, and public product-selection tools.',
				'Alongside that, I develop practical AI tools for service businesses, including workflow automation and instant quoting. I have also run a web agency and founded a watch brand, so I care about what happens after a product ships.',
			],
			skillsTitle: 'Tools I work with',
			experienceTitle: 'Experience',
			experience: [
				{ company: 'ESAB', role: 'Full-Stack Developer', period: 'Jun 2026 – present', description: 'Supporting the ESAB–Eddyfi integration and serving as a technical contact for web platforms across Eddyfi, Zetec, Sisgeo, Sensor Networks, and Huggenberger.' },
				{ company: 'Eddyfi Technologies', role: 'Full-Stack Developer', period: 'Sep 2023 – present', description: 'Building internal tools, API integrations, and web applications. Public work includes the Tubing Probe Creator and PAUT Probe Finder.' },
				{ company: 'Looka', role: 'Software Developer', period: 'Oct 2021 – Sep 2023', description: 'Developed features, backend services, data pipelines, and interfaces for an AI-powered branding platform.' },
				{ company: 'Inworld AI', role: 'Kotlin Developer · consultant', period: 'Mar – Aug 2022', description: 'Worked on character behavior and memory systems with Kotlin, Java, and SQL/NoSQL databases.' },
				{ company: 'Bloc Solutions', role: 'Analyst → Frontend Developer', period: 'Oct 2019 – Dec 2021', description: 'Started with analytics and dashboards, then moved into frontend development in October 2020, working with Vue, PHP, and Laravel.' },
				{ company: 'Quota Agence Web', role: 'Founder & Web Developer', period: 'Jun 2020 – Nov 2021', description: 'Led a team of five and delivered more than 35 client projects for retailers, service businesses, and restaurants. Managed development, project scope, delivery, and sales.' },
				{ company: 'owood', role: 'Founder', period: 'Mar 2018 – Feb 2020', description: 'Founded a wooden watch brand at 18, funded the launch through Kickstarter, and handled the product, Shopify store, marketing, and fulfillment. The business was acquired by a private buyer in 2020.' },
			],
			educationTitle: 'Education',
			education: [
				{ school: 'Université Laval', degree: "Bachelor's degree in Software Engineering", period: '2019 – 2023' },
				{ school: 'Cégep de Sainte-Foy', degree: 'Diploma of College Studies · Natural Sciences', period: '2016 – 2018' },
			],
			languagesTitle: 'Languages',
			languages: ['French', 'English', 'Arabic'],
			outsideTitle: 'Outside of work',
			outside: [],
		},
		projects: { title: 'Selected work', description: 'Public tools, independent projects, and a business I built.' },
		blog: { title: 'Notes', description: 'Short notes on web development and the decisions behind this site.', back: 'All notes', empty: 'No notes published yet.' },
		notFound: { title: 'Page not found', description: 'This page may have moved, or the address may be incorrect.' },
		status: { active: 'active', shipped: 'live', sunset: 'archived', building: 'in progress', employed: 'at work', running: 'running', exited: 'acquired' },
	},
	fr: {
		nav: { home: 'accueil', about: 'à propos', blog: 'notes', projects: 'projets', label: 'Navigation principale', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', language: 'Langue' },
		theme: { label: 'Apparence', light: 'Mode clair', dark: 'Mode sombre', system: 'Thème du système' },
		common: { skipToContent: 'Aller au contenu', contact: 'Me joindre', source: 'Code source', backHome: "Retour à l’accueil", allPosts: 'Toutes les notes', allProjects: 'Tous les projets', readMore: 'Lire la suite', updated: 'Mise à jour', share: 'Partager', copyLink: 'Copier le lien', copied: 'Lien copié', copyFailed: "Copie impossible. Copiez l’adresse dans votre navigateur." },
		home: {
			description: 'Aymen El Akbari, développeur full-stack à Québec. Outils internes, intégration d’API et automatisation des processus chez Eddyfi Technologies / ESAB.',
			role: 'Développeur full-stack.',
			intro: 'Outils internes, intégration d’API et automatisation des processus.',
			employerPrefix: 'Actuellement chez',
			location: 'Québec, Canada.',
			aboutLink: 'En savoir plus sur moi',
			writing: 'notes',
			building: 'projets choisis',
		},
		about: {
			title: 'À propos',
			description: 'Le parcours d’Aymen El Akbari : développement full-stack chez Eddyfi Technologies / ESAB, Looka, Inworld AI et Bloc Solutions, et entrepreneuriat.',
			intro: ["Je suis Aymen, développeur full-stack à Québec. Je crée des outils internes, relie des systèmes et automatise les tâches qui compliquent le travail au quotidien."],
			workTitle: 'Ce que je fais',
			work: [
				'Chez Eddyfi Technologies / ESAB, je développe des outils internes et des plateformes Web, de la définition des besoins au déploiement. Mon travail comprend l’intégration d’API, l’automatisation des processus et des outils publics de sélection de produits.',
				'En parallèle, je développe des outils d’IA pour les entreprises de services, notamment pour automatiser leurs processus et produire des soumissions instantanées. J’ai aussi dirigé une agence Web et fondé une marque de montres : ce qui se passe après le lancement d’un produit m’intéresse tout autant que sa création.',
			],
			skillsTitle: 'Mes outils de travail',
			experienceTitle: 'Expérience',
			experience: [
				{ company: 'ESAB', role: 'Développeur full-stack', period: 'Juin 2026 – aujourd’hui', description: 'Appui à l’intégration d’ESAB et d’Eddyfi, et rôle de référence technique pour les plateformes Web d’Eddyfi, Zetec, Sisgeo, Sensor Networks et Huggenberger.' },
				{ company: 'Eddyfi Technologies', role: 'Développeur full-stack', period: 'Sept. 2023 – aujourd’hui', description: 'Développement d’outils internes, d’intégrations d’API et d’applications Web. Parmi mes réalisations publiques : Tubing Probe Creator et PAUT Probe Finder.' },
				{ company: 'Looka', role: 'Développeur logiciel', period: 'Oct. 2021 – sept. 2023', description: 'Développement de fonctionnalités, de services backend, de pipelines de données et d’interfaces pour une plateforme de création d’identités de marque utilisant l’IA.' },
				{ company: 'Inworld AI', role: 'Développeur Kotlin · consultant', period: 'Mars – août 2022', description: 'Travail sur les systèmes de comportement et de mémoire des personnages avec Kotlin, Java et des bases de données SQL/NoSQL.' },
				{ company: 'Bloc Solutions', role: 'Analyste → développeur frontend', period: 'Oct. 2019 – déc. 2021', description: 'Analyse de données et tableaux de bord, puis passage au développement frontend en octobre 2020 avec Vue, PHP et Laravel.' },
				{ company: 'Quota Agence Web', role: 'Fondateur et développeur Web', period: 'Juin 2020 – nov. 2021', description: 'Direction d’une équipe de cinq personnes et livraison de plus de 35 projets pour des commerces, des entreprises de services et des restaurants. Prise en charge du développement, de la portée des projets, de la livraison et des ventes.' },
				{ company: 'owood', role: 'Fondateur', period: 'Mars 2018 – févr. 2020', description: 'Création d’une marque de montres en bois à 18 ans, avec un lancement financé sur Kickstarter. Gestion du produit, de la boutique Shopify, du marketing et des commandes. Entreprise acquise par un acheteur privé en 2020.' },
			],
			educationTitle: 'Formation',
			education: [
				{ school: 'Université Laval', degree: 'Baccalauréat en génie logiciel', period: '2019 – 2023' },
				{ school: 'Cégep de Sainte-Foy', degree: 'Diplôme d’études collégiales · Sciences de la nature', period: '2016 – 2018' },
			],
			languagesTitle: 'Langues',
			languages: ['Français', 'Anglais', 'Arabe'],
			outsideTitle: 'En dehors du travail',
			outside: [],
		},
		projects: { title: 'Projets choisis', description: 'Des outils publics, des projets indépendants et une entreprise que j’ai créée.' },
		blog: { title: 'Notes', description: 'Quelques notes sur le développement Web et les choix derrière ce site.', back: 'Toutes les notes', empty: 'Aucune note publiée pour le moment.' },
		notFound: { title: 'Page introuvable', description: 'Cette page a peut-être changé d’adresse, ou le lien est incorrect.' },
		status: { active: 'actif', shipped: 'en ligne', sunset: 'archivé', building: 'en cours', employed: 'en entreprise', running: 'en activité', exited: 'acquis' },
	},
	ar: {
		nav: { home: 'الرئيسية', about: 'نبذة عني', blog: 'مقالات', projects: 'المشاريع', label: 'التنقل الرئيسي', openMenu: 'فتح القائمة', closeMenu: 'إغلاق القائمة', language: 'اللغة' },
		theme: { label: 'المظهر', light: 'الوضع الفاتح', dark: 'الوضع الداكن', system: 'مظهر النظام' },
		common: { skipToContent: 'الانتقال إلى المحتوى', contact: 'تواصل معي', source: 'الشيفرة المصدرية', backHome: 'العودة إلى الرئيسية', allPosts: 'جميع المقالات', allProjects: 'جميع المشاريع', readMore: 'قراءة المزيد', updated: 'آخر تحديث', share: 'مشاركة', copyLink: 'نسخ الرابط', copied: 'تم نسخ الرابط', copyFailed: 'تعذّر النسخ. يمكنك نسخ العنوان من المتصفح.' },
		home: {
			description: 'أيمن الأكبري، مطوّر برمجيات متكامل في مدينة كيبيك. أعمل على الأدوات الداخلية وتكامل واجهات API وأتمتة سير العمل لدى Eddyfi Technologies / ESAB.',
			role: 'مطوّر برمجيات متكامل.',
			intro: 'أدوات داخلية، وتكامل الأنظمة، وأتمتة سير العمل.',
			employerPrefix: 'أعمل حاليًا لدى',
			location: 'مدينة كيبيك، كندا.',
			aboutLink: 'المزيد عني',
			writing: 'مقالات',
			building: 'أعمال مختارة',
		},
		about: {
			title: 'نبذة عني',
			description: 'مسيرة أيمن الأكبري في تطوير البرمجيات لدى Eddyfi Technologies / ESAB وLooka وInworld AI وBloc Solutions، إلى جانب ريادة الأعمال.',
			intro: ['أنا أيمن، مطوّر برمجيات متكامل مقيم في مدينة كيبيك. أبني أدوات داخلية، وأربط الأنظمة ببعضها، وأؤتمت المهام التي تعيق العمل اليومي.'],
			workTitle: 'ما أعمل عليه',
			work: [
				'أطوّر لدى Eddyfi Technologies / ESAB أدوات داخلية ومنصات ويب، من تحديد المتطلبات إلى التنفيذ والنشر. ويشمل عملي تكامل واجهات API وأتمتة سير العمل وأدوات عامة تساعد على اختيار المنتجات.',
				'وبالتوازي، أعمل على أدوات ذكاء اصطناعي عملية لشركات الخدمات، منها أتمتة الإجراءات وتقديم تقديرات فورية للأسعار. سبق لي أيضًا أن أدرت وكالة لتطوير الويب وأسست علامة تجارية للساعات، لذلك أهتم بما يحدث بعد إطلاق المنتج بقدر اهتمامي ببنائه.',
			],
			skillsTitle: 'الأدوات التي أستخدمها',
			experienceTitle: 'الخبرة المهنية',
			experience: [
				{ company: 'ESAB', role: 'مطوّر برمجيات متكامل', period: 'يونيو 2026 – حتى الآن', description: 'دعم التكامل بين ESAB وEddyfi، والعمل جهة اتصال تقنية لمنصات الويب لدى Eddyfi وZetec وSisgeo وSensor Networks وHuggenberger.' },
				{ company: 'Eddyfi Technologies', role: 'مطوّر برمجيات متكامل', period: 'سبتمبر 2023 – حتى الآن', description: 'تطوير أدوات داخلية وتكاملات لواجهات API وتطبيقات ويب. ومن الأعمال المتاحة للجمهور أداتا Tubing Probe Creator وPAUT Probe Finder.' },
				{ company: 'Looka', role: 'مطوّر برمجيات', period: 'أكتوبر 2021 – سبتمبر 2023', description: 'تطوير مزايا وخدمات خلفية ومسارات لمعالجة البيانات وواجهات لمنصة تستخدم الذكاء الاصطناعي لإنشاء الهويات البصرية.' },
				{ company: 'Inworld AI', role: 'مطوّر Kotlin · مستشار', period: 'مارس – أغسطس 2022', description: 'العمل على أنظمة سلوك الشخصيات وذاكرتها باستخدام Kotlin وJava وقواعد بيانات SQL وNoSQL.' },
				{ company: 'Bloc Solutions', role: 'محلل ثم مطوّر واجهات أمامية', period: 'أكتوبر 2019 – ديسمبر 2021', description: 'بدأت بتحليل البيانات ولوحات المتابعة، ثم انتقلت إلى تطوير الواجهات الأمامية في أكتوبر 2020 باستخدام Vue وPHP وLaravel.' },
				{ company: 'Quota Agence Web', role: 'مؤسس ومطوّر ويب', period: 'يونيو 2020 – نوفمبر 2021', description: 'قدت فريقًا من خمسة أشخاص وأنجزنا أكثر من 35 مشروعًا لمتاجر وشركات خدمات ومطاعم. تولّيت التطوير وتحديد نطاق المشاريع وتسليمها والمبيعات.' },
				{ company: 'owood', role: 'مؤسس', period: 'مارس 2018 – فبراير 2020', description: 'أسست علامة للساعات الخشبية في سن الثامنة عشرة، وموّلت إطلاقها عبر Kickstarter. تولّيت المنتج ومتجر Shopify والتسويق وتنفيذ الطلبات، ثم استحوذ عليها مشترٍ خاص في عام 2020.' },
			],
			educationTitle: 'التعليم',
			education: [
				{ school: 'Université Laval', degree: 'بكالوريوس في هندسة البرمجيات', period: '2019 – 2023' },
				{ school: 'Cégep de Sainte-Foy', degree: 'دبلوم التعليم ما قبل الجامعي · العلوم الطبيعية', period: '2016 – 2018' },
			],
			languagesTitle: 'اللغات',
			languages: ['الفرنسية', 'الإنجليزية', 'العربية'],
			outsideTitle: 'خارج العمل',
			outside: [],
		},
		projects: { title: 'أعمال مختارة', description: 'أدوات متاحة للجمهور، ومشاريع مستقلة، وعلامة تجارية أسستها.' },
		blog: { title: 'مقالات', description: 'مقالات قصيرة عن تطوير الويب والخيارات التي يقوم عليها هذا الموقع.', back: 'جميع المقالات', empty: 'لا توجد مقالات منشورة بعد.' },
		notFound: { title: 'الصفحة غير موجودة', description: 'ربما نُقلت هذه الصفحة، أو أن العنوان غير صحيح.' },
		status: { active: 'نشط', shipped: 'متاح', sunset: 'مؤرشف', building: 'قيد التطوير', employed: 'ضمن عملي', running: 'قائم', exited: 'تم الاستحواذ عليه' },
	},
};

export function getCopy(locale: Locale): SiteCopy {
	return copy[locale];
}

export function getLocale(pathname: string): Locale {
	const first = pathname.split('/').filter(Boolean)[0];
	return first === 'fr' || first === 'ar' ? first : 'en';
}

/** Returns an unprefixed site path with a trailing slash. */
export function stripLocale(pathname: string): string {
	const path = pathname.split(/[?#]/, 1)[0] || '/';
	const segments = path.split('/').filter(Boolean);
	if (segments[0] === 'fr' || segments[0] === 'ar' || segments[0] === 'en') segments.shift();
	return segments.length ? `/${segments.join('/')}/` : '/';
}

export function localizedPath(locale: Locale, pathname = '/'): string {
	const path = stripLocale(pathname);
	return locale === 'en' ? path : `/${locale}${path}`;
}

const dateLocales: Record<Locale, string> = { en: 'en-CA', fr: 'fr-CA', ar: 'ar' };

export function formatDate(date: Date, locale: Locale, options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }): string {
	return new Intl.DateTimeFormat(dateLocales[locale], { ...options, timeZone: 'UTC' }).format(date);
}

export function readingTime(content: string, locale: Locale): string {
	const words = content.trim().split(/\s+/u).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	if (locale === 'fr') return `${minutes} min de lecture`;
	if (locale === 'ar') return `${new Intl.NumberFormat('ar').format(minutes)} د قراءة`;
	return `${minutes} min read`;
}
