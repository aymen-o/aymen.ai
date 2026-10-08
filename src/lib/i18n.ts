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
		nav: { home: 'home', about: 'about', blog: 'notes', projects: 'work', label: 'Main navigation', openMenu: 'Open menu', closeMenu: 'Close menu', language: 'Language' },
		theme: { label: 'Appearance', light: 'Light mode', dark: 'Dark mode', system: 'System theme' },
		common: { skipToContent: 'Skip to content', contact: 'Get in touch', source: 'Source', backHome: 'Back home', allPosts: 'All notes', allProjects: 'All projects', readMore: 'Read more', updated: 'Updated', share: 'Share', copyLink: 'Copy link', copied: 'Link copied', copyFailed: 'Could not copy. Copy the address from your browser.' },
		home: {
			description: 'Aymen El Akbari — software developer in Canada. AI character systems at Inworld, design tools at Looka, and NDT configuration at Eddyfi / ESAB.',
			role: 'Software developer · AI & product',
			intro: 'Character memory at Inworld. AI-powered design at Looka. Now, NDT configuration at Eddyfi / ESAB.',
			employerPrefix: 'Currently at',
			location: 'Canada.',
			aboutLink: 'More about me',
			writing: 'notes',
			building: 'Things I’ve built',
		},
		about: {
			title: 'About',
			description: 'Aymen El Akbari — software developer working across AI character systems, design tools, and industrial inspection. Founder of owood and Quota Agence Web.',
			intro: ["I’m Aymen, a software developer in Canada. My work has taken me from character systems at Inworld AI and design tools at Looka to industrial inspection at Eddyfi / ESAB."],
			workTitle: 'What I work on',
			work: [
				'At Eddyfi / ESAB, I build software for non-destructive testing (NDT). The probe tools turn inspection requirements into compatible product configurations and quote requests: tube material and dimensions on one side, probe specifications and part numbers on the other.',
				'I’ve also had to sell and operate what I built. I founded owood at 18, handled the product and its Shopify store, and took it from a Kickstarter launch to acquisition. Later, I ran a five-person web agency.',
			],
			skillsTitle: 'Tools I work with',
			experienceTitle: 'Experience',
			experience: [
				{ company: 'ESAB', role: 'Software Developer', period: 'Jun 2026 – present', description: 'Web platforms across Eddyfi, Zetec, Sisgeo, Sensor Networks, and Huggenberger during the ESAB–Eddyfi integration.' },
				{ company: 'Eddyfi Technologies', role: 'Software Developer', period: 'Sep 2023 – present', description: 'Built the Tubing Probe Creator and PAUT Probe Finder: configuration and quoting tools for non-destructive testing. Also work on internal platforms and API integrations.' },
				{ company: 'Looka', role: 'Software Developer', period: 'Oct 2021 – Sep 2023', description: 'Built backend services, data pipelines, and product interfaces for AI-generated logos and brand identities.' },
				{ company: 'Inworld AI', role: 'Kotlin Developer · consultant', period: 'Mar – Aug 2022', description: 'Worked on AI character behavior and memory systems with Kotlin and SQL/NoSQL databases.' },
				{ company: 'Bloc Solutions', role: 'Analyst → Frontend Developer', period: 'Oct 2019 – Dec 2021', description: 'Moved from analytics into frontend development in October 2020. Built product interfaces with Vue, PHP, and Laravel.' },
				{ company: 'Quota Agence Web', role: 'Founder & Web Developer', period: 'Jun 2020 – Nov 2021', description: 'Ran a five-person agency delivering more than 35 web projects. Worked on development, scoping, sales, and delivery.' },
				{ company: 'owood', role: 'Founder', period: 'Mar 2018 – Feb 2020', description: 'Founded a wooden watch brand at 18. Built the product and Shopify store, ran the Kickstarter launch, and handled marketing and fulfillment. Acquired in 2020.' },
			],
			educationTitle: 'Education',
			education: [
				{ school: 'Université Laval', degree: "Bachelor's degree in Software Engineering", period: '2019 – 2023' },
				{ school: 'Harvard University', degree: 'Computer Science coursework', period: '' },
			],
			languagesTitle: 'Languages',
			languages: [],
			outsideTitle: 'Outside of work',
			outside: [],
		},
		projects: { title: 'Work', description: 'Inspection probes, AI characters, brand-generation tools, and a watch brand.' },
		blog: { title: 'Notes', description: 'Short notes on web development and the decisions behind this site.', back: 'All notes', empty: 'No notes published yet.' },
		notFound: { title: 'Page not found', description: 'This page may have moved, or the address may be incorrect.' },
		status: { active: 'active', shipped: 'built', sunset: 'archived', building: 'in progress', employed: 'at work', running: 'running', exited: 'acquired' },
	},
	fr: {
		nav: { home: 'accueil', about: 'à propos', blog: 'notes', projects: 'projets', label: 'Navigation principale', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', language: 'Langue' },
		theme: { label: 'Apparence', light: 'Mode clair', dark: 'Mode sombre', system: 'Thème du système' },
		common: { skipToContent: 'Aller au contenu', contact: 'Me joindre', source: 'Code source', backHome: "Retour à l’accueil", allPosts: 'Toutes les notes', allProjects: 'Tous les projets', readMore: 'Lire la suite', updated: 'Mise à jour', share: 'Partager', copyLink: 'Copier le lien', copied: 'Lien copié', copyFailed: "Copie impossible. Copiez l’adresse dans votre navigateur." },
		home: {
			description: 'Aymen El Akbari, développeur logiciel au Canada. Personnages IA chez Inworld, outils de design chez Looka et configuration de sondes CND chez Eddyfi / ESAB.',
			role: 'Développeur logiciel · IA & produit',
			intro: 'La mémoire des personnages chez Inworld. Le design par IA chez Looka. Aujourd’hui, la configuration de sondes CND chez Eddyfi / ESAB.',
			employerPrefix: 'Actuellement chez',
			location: 'Canada.',
			aboutLink: 'En savoir plus sur moi',
			writing: 'notes',
			building: 'Ce que je construis',
		},
		about: {
			title: 'À propos',
			description: 'Aymen El Akbari, développeur logiciel : personnages IA, outils de design et inspection industrielle. Fondateur d’owood et de Quota Agence Web.',
			intro: ["Je suis Aymen, développeur logiciel au Canada. Mon parcours m’a mené des personnages d’Inworld AI et des outils de design de Looka à l’inspection industrielle chez Eddyfi / ESAB."],
			workTitle: 'Mon travail',
			work: [
				'Chez Eddyfi / ESAB, je développe des logiciels de contrôle non destructif (CND). Les outils de sélection de sondes traduisent les besoins d’inspection en configurations compatibles et en demandes de soumission : d’un côté, le matériau et les dimensions d’un tube; de l’autre, les caractéristiques et les numéros de pièce des sondes.',
				'J’ai aussi dû vendre et faire fonctionner ce que je créais. J’ai fondé owood à 18 ans, conçu le produit et sa boutique Shopify, puis mené la marque d’un lancement sur Kickstarter jusqu’à son acquisition. J’ai ensuite dirigé une agence Web de cinq personnes.',
			],
			skillsTitle: 'Mes outils de travail',
			experienceTitle: 'Expérience',
			experience: [
				{ company: 'ESAB', role: 'Développeur logiciel', period: 'Juin 2026 – aujourd’hui', description: 'Plateformes Web d’Eddyfi, Zetec, Sisgeo, Sensor Networks et Huggenberger dans le cadre de l’intégration d’ESAB et d’Eddyfi.' },
				{ company: 'Eddyfi Technologies', role: 'Développeur logiciel', period: 'Sept. 2023 – aujourd’hui', description: 'Création de Tubing Probe Creator et de PAUT Probe Finder : des outils de configuration et de soumission pour le contrôle non destructif. Travail également sur les plateformes internes et les intégrations d’API.' },
				{ company: 'Looka', role: 'Développeur logiciel', period: 'Oct. 2021 – sept. 2023', description: 'Développement de services backend, de pipelines de données et d’interfaces pour la création de logos et d’identités de marque par IA.' },
				{ company: 'Inworld AI', role: 'Développeur Kotlin · consultant', period: 'Mars – août 2022', description: 'Travail sur le comportement et la mémoire de personnages IA avec Kotlin et des bases de données SQL/NoSQL.' },
				{ company: 'Bloc Solutions', role: 'Analyste → développeur frontend', period: 'Oct. 2019 – déc. 2021', description: 'Passage de l’analyse de données au développement frontend en octobre 2020. Création d’interfaces avec Vue, PHP et Laravel.' },
				{ company: 'Quota Agence Web', role: 'Fondateur et développeur Web', period: 'Juin 2020 – nov. 2021', description: 'Direction d’une agence de cinq personnes et livraison de plus de 35 projets Web. Développement, définition des mandats, ventes et livraison.' },
				{ company: 'owood', role: 'Fondateur', period: 'Mars 2018 – févr. 2020', description: 'Création d’une marque de montres en bois à 18 ans. Produit, boutique Shopify, lancement sur Kickstarter, marketing et commandes. Entreprise acquise en 2020.' },
			],
			educationTitle: 'Formation',
			education: [
				{ school: 'Université Laval', degree: 'Baccalauréat en génie logiciel', period: '2019 – 2023' },
				{ school: 'Harvard University', degree: 'Cours en informatique', period: '' },
			],
			languagesTitle: 'Langues',
			languages: [],
			outsideTitle: 'En dehors du travail',
			outside: [],
		},
		projects: { title: 'Projets', description: 'Des sondes d’inspection, des personnages IA, des outils de création de marques et une marque de montres.' },
		blog: { title: 'Notes', description: 'Quelques notes sur le développement Web et les choix derrière ce site.', back: 'Toutes les notes', empty: 'Aucune note publiée pour le moment.' },
		notFound: { title: 'Page introuvable', description: 'Cette page a peut-être changé d’adresse, ou le lien est incorrect.' },
		status: { active: 'actif', shipped: 'réalisé', sunset: 'archivé', building: 'en cours', employed: 'en entreprise', running: 'en activité', exited: 'acquis' },
	},
	ar: {
		nav: { home: 'الرئيسية', about: 'نبذة عني', blog: 'مقالات', projects: 'المشاريع', label: 'التنقل الرئيسي', openMenu: 'فتح القائمة', closeMenu: 'إغلاق القائمة', language: 'اللغة' },
		theme: { label: 'المظهر', light: 'الوضع الفاتح', dark: 'الوضع الداكن', system: 'مظهر النظام' },
		common: { skipToContent: 'الانتقال إلى المحتوى', contact: 'تواصل معي', source: 'الشيفرة المصدرية', backHome: 'العودة إلى الرئيسية', allPosts: 'جميع المقالات', allProjects: 'جميع المشاريع', readMore: 'قراءة المزيد', updated: 'آخر تحديث', share: 'مشاركة', copyLink: 'نسخ الرابط', copied: 'تم نسخ الرابط', copyFailed: 'تعذّر النسخ. يمكنك نسخ العنوان من المتصفح.' },
		home: {
			description: 'أيمن الأكبري، مطوّر برمجيات في كندا. شخصيات ذكية لدى Inworld، وأدوات تصميم لدى Looka، وأدوات تهيئة مجسّات الفحص لدى Eddyfi / ESAB.',
			role: 'مطوّر برمجيات · ذكاء اصطناعي ومنتجات',
			intro: 'ذاكرة الشخصيات لدى Inworld. والتصميم بالذكاء الاصطناعي لدى Looka. واليوم، تهيئة مجسّات الفحص غير الإتلافي لدى Eddyfi / ESAB.',
			employerPrefix: 'أعمل حاليًا لدى',
			location: 'كندا.',
			aboutLink: 'المزيد عني',
			writing: 'مقالات',
			building: 'ما أبنيه',
		},
		about: {
			title: 'نبذة عني',
			description: 'أيمن الأكبري، مطوّر برمجيات في مجالات الشخصيات الذكية وأدوات التصميم والفحص الصناعي، ومؤسس owood وQuota Agence Web.',
			intro: ['أنا أيمن، مطوّر برمجيات في كندا. انتقلت في عملي من أنظمة الشخصيات لدى Inworld AI وأدوات التصميم لدى Looka إلى الفحص الصناعي لدى Eddyfi / ESAB.'],
			workTitle: 'ما أعمل عليه',
			work: [
				'أطوّر لدى Eddyfi / ESAB برمجيات للفحص غير الإتلافي. تحوّل أدوات اختيار المجسّات متطلبات الفحص إلى مواصفات منتجات متوافقة وطلبات عروض أسعار: مادة الأنبوب وأبعاده من جهة، ومواصفات المجسّات وأرقام القطع من جهة أخرى.',
				'سبق لي أيضًا أن تولّيت بيع ما أبنيه وإدارته. أسست owood في سن الثامنة عشرة، وطوّرت المنتج ومتجره على Shopify، من الإطلاق عبر Kickstarter إلى الاستحواذ على العلامة. ثم أدرت وكالة لتطوير الويب من خمسة أشخاص.',
			],
			skillsTitle: 'الأدوات التي أستخدمها',
			experienceTitle: 'الخبرة المهنية',
			experience: [
				{ company: 'ESAB', role: 'مطوّر برمجيات', period: 'يونيو 2026 – حتى الآن', description: 'العمل على منصات الويب لدى Eddyfi وZetec وSisgeo وSensor Networks وHuggenberger ضمن عملية التكامل بين ESAB وEddyfi.' },
				{ company: 'Eddyfi Technologies', role: 'مطوّر برمجيات', period: 'سبتمبر 2023 – حتى الآن', description: 'تطوير أداتي Tubing Probe Creator وPAUT Probe Finder لاختيار مجسّات الفحص غير الإتلافي وتحديد مواصفاتها وطلب عروض أسعار، إلى جانب المنصات الداخلية وتكامل واجهات API.' },
				{ company: 'Looka', role: 'مطوّر برمجيات', period: 'أكتوبر 2021 – سبتمبر 2023', description: 'تطوير خدمات خلفية ومسارات لمعالجة البيانات وواجهات لإنشاء الشعارات والهويات البصرية بالذكاء الاصطناعي.' },
				{ company: 'Inworld AI', role: 'مطوّر Kotlin · مستشار', period: 'مارس – أغسطس 2022', description: 'العمل على سلوك الشخصيات الذكية وذاكرتها باستخدام Kotlin وقواعد بيانات SQL وNoSQL.' },
				{ company: 'Bloc Solutions', role: 'محلل ثم مطوّر واجهات أمامية', period: 'أكتوبر 2019 – ديسمبر 2021', description: 'انتقلت من تحليل البيانات إلى تطوير الواجهات الأمامية في أكتوبر 2020. طوّرت واجهات باستخدام Vue وPHP وLaravel.' },
				{ company: 'Quota Agence Web', role: 'مؤسس ومطوّر ويب', period: 'يونيو 2020 – نوفمبر 2021', description: 'أدرت وكالة من خمسة أشخاص أنجزت أكثر من 35 مشروع ويب. تولّيت التطوير وتحديد نطاق المشاريع والمبيعات والتسليم.' },
				{ company: 'owood', role: 'مؤسس', period: 'مارس 2018 – فبراير 2020', description: 'أسست علامة للساعات الخشبية في سن الثامنة عشرة. تولّيت المنتج ومتجر Shopify والإطلاق عبر Kickstarter والتسويق وتنفيذ الطلبات. استُحوذ على العلامة في عام 2020.' },
			],
			educationTitle: 'التعليم',
			education: [
				{ school: 'Université Laval', degree: 'بكالوريوس في هندسة البرمجيات', period: '2019 – 2023' },
				{ school: 'Harvard University', degree: 'مقررات في علوم الحاسوب', period: '' },
			],
			languagesTitle: 'اللغات',
			languages: [],
			outsideTitle: 'خارج العمل',
			outside: [],
		},
		projects: { title: 'أعمالي', description: 'مجسّات فحص، وشخصيات ذكية، وأدوات لإنشاء الهويات البصرية، وعلامة للساعات.' },
		blog: { title: 'مقالات', description: 'مقالات قصيرة عن تطوير الويب والخيارات التي يقوم عليها هذا الموقع.', back: 'جميع المقالات', empty: 'لا توجد مقالات منشورة بعد.' },
		notFound: { title: 'الصفحة غير موجودة', description: 'ربما نُقلت هذه الصفحة، أو أن العنوان غير صحيح.' },
		status: { active: 'نشط', shipped: 'مُنجز', sunset: 'مؤرشف', building: 'قيد التطوير', employed: 'ضمن عملي', running: 'قائم', exited: 'تم الاستحواذ عليه' },
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
