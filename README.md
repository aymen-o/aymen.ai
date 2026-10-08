# Aymen El Akbari — personal website

Professional portfolio at **https://aymen.ca**, with English at `/`, French at `/fr/`, and Arabic at `/ar/`. Contact remains **hello@aymen.ca**. The GitHub repository is private; only the compiled static site is deployed.

## Development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run validate
npm run audit
npm run preview
```

GitHub Actions validates every pull request and push to `main` using Node.js 22. Vercel runs the same `npm run validate` command before publishing: type checking, deployment-verifier regression tests, the static build, and site QA. The workflow has read-only repository permissions, pins its actions to commit SHAs, and requires no deployment credentials.

The build generates static pages in all three languages. It fails if scripts violate the generated Content Security Policy, source maps or private files enter the output, or inline event handlers appear. `qa:site` checks routes, local links, heading hierarchy, identity metadata, language alternates, image dimensions, and removal of retired Notes URLs.

After deploying to Vercel:

```sh
npm run verify:deployment -- https://aymen.ca
```

The live verifier checks all nine localized pages against their exact deployment paths and production canonical URLs. It rejects unexpected redirects before forwarding any optional Vercel bypass header, and checks retired and unknown routes return 404. Private-path probes permit only a single same-origin redirect that adds a trailing slash, as required by Vercel’s route normalization. Run it after deploying; the mocked regression tests run during validation without network access.

Browser checks are still needed for layout, keyboard navigation, theme controls, and translations. The static checks are not a substitute for browser testing.

## Content

- `src/lib/i18n.ts`: navigation, biography, experience, education, and interface copy.
- `src/content/projects/`: English, French, and Arabic project entries.
- `archive/notes/`: retired articles and their images, preserved outside the published site.
- `src/components/pages/`: shared templates for all three languages.
- `src/layouts/BaseLayout.astro`: language direction, metadata, structured data, and theme initialization.

Set `draft: true` to keep a project entry unpublished. Keep facts and dates consistent with the public professional profile. The retired `/blog/`, `/fr/blog/`, and `/ar/blog/` URLs and their articles return a normal 404; they are absent from navigation and the sitemap.

## Design and security

The site retains its narrow reading column, monochrome palette, Geist typography, and Arabic name motif. Fonts are self-hosted; Arabic uses Noto Sans Arabic. Subtle grain, cursor glow, staggered entrances, and hover motion respect reduced-motion preferences. Navigation, project details, and both NDT workflow explanations remain readable without JavaScript. Progressive enhancements add a sun/moon toggle, an interactive tubing/PAUT workflow switch, and a keyboard command palette (Cmd/Ctrl+K).

Astro builds HTML ahead of time. There is no application server, database, login, contact form, analytics service, or client secret. Vercel serves `dist/` and applies the response headers from `vercel.json`. Astro generates exact CSP hashes; the build finalizer places that policy before scripts and styles. Keep the finalizer and build verification steps in the deployment command.

Public HTML, CSS, and JavaScript remain inspectable in a visitor's browser. Minification and omitted source maps reduce exposure of development details; they are not a way to make frontend code secret.

## Domains

Use `aymen.ca` as the production domain. Redirect `aymen.ai` and `www` aliases permanently to `https://aymen.ca`, preserving paths. DNS changes must preserve the existing iCloud Mail MX, SPF, DKIM, and ownership-verification records. This website does not require email configuration changes.
