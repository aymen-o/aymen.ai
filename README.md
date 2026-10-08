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
npm run check
npm run build
npm run qa:site
npm run audit
npm run preview
```

The build generates 19 static pages. It fails if scripts violate the generated Content Security Policy, source maps or private files enter the output, or inline event handlers appear. `qa:site` checks routes, local links, heading hierarchy, identity metadata, language alternates, and image dimensions.

After deploying to Vercel:

```sh
npm run verify:deployment -- https://aymen.ca
```

Browser checks are still needed for layout, keyboard navigation, theme controls, and translations. The static checks are not a substitute for browser testing.

## Content

- `src/lib/i18n.ts`: navigation, biography, experience, education, and interface copy.
- `src/content/projects/`: English, French, and Arabic project entries.
- `src/content/blog/`: translated articles. `translationKey` keeps the equivalent article connected across languages.
- `src/components/pages/`: shared templates for all three languages.
- `src/layouts/BaseLayout.astro`: language direction, metadata, structured data, and theme initialization.

Set `draft: true` to keep an entry unpublished. Keep facts and dates consistent with the public professional profile. When changing a published article, set its `updated` date and retain the original `date` and `translationKey`.

## Design and security

The site retains its narrow reading column, monochrome palette, Geist typography, and Arabic name motif. Fonts are self-hosted; Arabic uses Noto Sans Arabic. Grain is a static texture. Navigation and content work without JavaScript, with optional enhancements for appearance controls, menu closing, and copying article links.

Astro builds HTML ahead of time. There is no application server, database, login, contact form, analytics service, or client secret. Vercel serves `dist/` and applies the response headers from `vercel.json`. Astro generates exact CSP hashes; the build finalizer places that policy before scripts and styles. Keep the finalizer and build verification steps in the deployment command.

Public HTML, CSS, and JavaScript remain inspectable in a visitor's browser. Minification and omitted source maps reduce exposure of development details; they are not a way to make frontend code secret.

## Domains

Use `aymen.ca` as the production domain. Redirect `aymen.ai` and `www` aliases permanently to `https://aymen.ca`, preserving paths. DNS changes must preserve the existing iCloud Mail MX, SPF, DKIM, and ownership-verification records. This website does not require email configuration changes.
