import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

// Check built HTML, not a running browser. Layout, contrast, focus, and responsive
// behavior still require visual/keyboard verification of the production preview.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const origin = 'https://aymen.ca';
const locales = ['en', 'fr', 'ar'];
const errors = [];
const files = new Set(await collectFiles(output));
const pages = new Map();
let linksChecked = 0;

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const document = parse(await readFile(join(output, file), 'utf8'));
  const nodes = elements(document);
  const route = file === 'index.html' ? '/' : file.endsWith('/index.html') ? `/${file.slice(0, -10)}` : `/${file}`;
  const locale = route.startsWith('/fr/') ? 'fr' : route.startsWith('/ar/') ? 'ar' : 'en';
  const page = { file, route, locale, document, nodes };
  page.head = nodes.find(node => node.tagName === 'head');
  page.main = nodes.find(node => node.tagName === 'main');
  page.noindex = metadata(page, 'robots').includes('noindex');
  page.alternates = new Map(nodes.filter(node => node.tagName === 'link' && attr(node, 'rel') === 'alternate').map(node => [attr(node, 'hreflang'), attr(node, 'href')]));
  pages.set(route, page);
}
check(pages.size > 0, 'No generated HTML found. Run npm run build first.');

for (const page of pages.values()) {
  const fail = message => check(false, `${page.route}: ${message}`);
  const html = page.nodes.find(node => node.tagName === 'html');
  check(attr(html, 'lang') === page.locale, `${page.route}: incorrect document language`);
  check(attr(html, 'dir') === (page.locale === 'ar' ? 'rtl' : 'ltr'), `${page.route}: incorrect writing direction`);
  const mainElements = page.nodes.filter(node => node.tagName === 'main');
  check(mainElements.length === 1 && attr(page.main, 'id') === 'main-content', `${page.route}: expected one main content target`);
  const headings = page.nodes.filter(node => /^h[1-6]$/.test(node.tagName));
  const h1 = headings.filter(node => node.tagName === 'h1');
  check(h1.length === 1 && text(h1[0]).trim() && !markedHidden(h1[0]), `${page.route}: expected one nonempty h1 not marked hidden`);
  let previousLevel = 0;
  for (const heading of headings) {
    const level = Number(heading.tagName[1]);
    if (level > previousLevel + 1) fail(`heading level jumps h${previousLevel} → h${level}: ${text(heading).trim()}`);
    previousLevel = level;
  }
  const ids = page.nodes.map(node => attr(node, 'id')).filter(Boolean);
  check(ids.length === new Set(ids).size, `${page.route}: duplicate element IDs`);
  const title = text(page.nodes.find(node => node.tagName === 'title')).trim();
  check(title === (page.locale === 'ar' ? 'أيمن الأكبري' : 'Aymen El Akbari'), `${page.route}: title must contain only the localized professional name`);
  check(!title.includes('aymen.ai'), `${page.route}: title has outdated domain branding`);
  check(Boolean(metadata(page, 'description').trim()), `${page.route}: missing meta description`);
  const canonicalTags = page.nodes.filter(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
  check(canonicalTags.length === 1, `${page.route}: expected exactly one canonical`);
  const canonical = attr(canonicalTags[0], 'href');
  check(canonical.startsWith(`${origin}/`), `${page.route}: canonical uses wrong origin`);
  if (!page.noindex) check(canonical === `${origin}${page.route}`, `${page.route}: canonical does not match generated route`);
  for (const key of ['og:title', 'twitter:title']) check(metadata(page, key) === title, `${page.route}: ${key} differs from title`);
  check(metadata(page, 'og:url') === canonical, `${page.route}: Open Graph URL differs from canonical`);
  for (const key of ['og:image', 'twitter:image']) check(metadata(page, key) === `${origin}/og/default.png`, `${page.route}: ${key} does not use current social image`);
  check(metadata(page, 'og:image:width') === '1200' && metadata(page, 'og:image:height') === '630', `${page.route}: incorrect social image dimensions`);

  if (!page.noindex) {
    check(page.alternates.size === 4, `${page.route}: expected en/fr/ar/x-default alternates`);
    for (const locale of locales) {
      const href = page.alternates.get(locale);
      const expected = `${origin}${localizedPath(locale, page.route)}`;
      check(href === expected, `${page.route}: incorrect ${locale} alternate`);
      const target = pages.get(new URL(expected).pathname);
      check(Boolean(target), `${page.route}: ${locale} alternate does not exist`);
      if (target) check(target.alternates.get(page.locale) === canonical, `${page.route}: ${locale} alternate is not reciprocal`);
    }
    check(page.alternates.get('x-default') === page.alternates.get('en'), `${page.route}: x-default must target English equivalent`);
  }

  for (const node of page.nodes) {
    for (const attribute of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
      for (const id of attr(node, attribute).split(/\s+/).filter(Boolean)) {
        check(page.nodes.some(target => attr(target, 'id') === id), `${page.route}: ${attribute} references a missing element: ${id}`);
      }
    }
    if (node.tagName === 'button' || (['input', 'select', 'textarea'].includes(node.tagName) && attr(node, 'type') !== 'hidden')) {
      const labelledBy = attr(node, 'aria-labelledby').split(/\s+/).filter(Boolean).map(id => accessibleText(page.nodes.find(target => attr(target, 'id') === id))).join(' ');
      const label = page.nodes.filter(target => target.tagName === 'label' && attr(target, 'for') === attr(node, 'id') && attr(node, 'id')).map(accessibleText).join(' ');
      const name = attr(node, 'aria-label') || labelledBy || label || (node.tagName === 'button' ? accessibleText(node) : '') || attr(node, 'title');
      check(Boolean(name.trim()), `${page.route}: ${node.tagName} control has no accessible name`);
    }
    if (node.tagName === 'script' && attr(node, 'type') === 'application/ld+json') {
      try {
        const data = JSON.parse(text(node));
        const person = data['@graph']?.find(entity => entity['@type'] === 'Person');
        check(person?.name === 'Aymen El Akbari' && person?.url === `${origin}/`, `${page.route}: invalid person identity in structured data`);
      } catch { fail('invalid JSON-LD'); }
    }
    const href = attr(node, 'href');
    const src = attr(node, 'src');
    for (const reference of [href, src].filter(Boolean)) {
      if (/^(?:data:|mailto:|tel:)/i.test(reference)) continue;
      let url;
      try { url = new URL(reference, `${origin}${page.route}`); } catch { fail(`invalid URL: ${reference}`); continue; }
      if (!['https:', 'http:'].includes(url.protocol)) { fail(`unsupported public URL protocol: ${reference}`); continue; }
      if (/^(?:localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(url.hostname)) fail(`local development URL exposed: ${reference}`);
      if (url.origin !== origin) {
        if (/^github\.com$/i.test(url.hostname) && /^\/aymen-o\/aymen\.ai(?:\/|$)/.test(url.pathname)) fail(`private portfolio repository linked: ${reference}`);
        continue;
      }
      linksChecked++;
      const path = decodeURIComponent(url.pathname);
      if (/(?:^|\/)(?:src|node_modules|\.git|\.env[^/]*)(?:\/|$)|\.(?:astro|tsx?|mdx?|map|pem|key)$/.test(path)) fail(`private/source path linked: ${reference}`);
      const target = pages.get(path) || pages.get(path.endsWith('/') ? path : `${path}/`);
      const staticFile = path.replace(/^\//, '');
      if (!target && !files.has(staticFile)) { fail(`missing local target: ${reference}`); continue; }
      if (url.hash && target) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (id) check(target.nodes.some(element => attr(element, 'id') === id), `${page.route}: missing fragment target ${reference}`);
      }
    }
    if (node.tagName === 'a' && attr(node, 'target') === '_blank') {
      const rel = attr(node, 'rel').split(/\s+/);
      check(rel.includes('noopener'), `${page.route}: external tab link lacks noopener`);
    }
    if (node.tagName === 'a' && attr(node, 'hreflang')) {
      const locale = attr(node, 'hreflang');
      check(locales.includes(locale) && attr(node, 'lang') === locale, `${page.route}: incorrect language-switch label language`);
      if (!page.noindex) {
        check(href === localizedPath(locale, page.route), `${page.route}: language switch loses current page`);
        check((attr(node, 'aria-current') === 'true') === (locale === page.locale), `${page.route}: language switch current state is incorrect`);
      }
    }
  }
  check(page.nodes.some(node => node.tagName === 'a' && attr(node, 'href') === 'mailto:hello@aymen.ca'), `${page.route}: established contact email is missing`);
}

for (const locale of locales) {
  for (const route of ['/', '/about/', '/projects/']) {
    check(pages.has(localizedPath(locale, route)), `Missing ${locale} core route: ${route}`);
  }
}
for (const route of pages.keys()) {
  check(!/^\/(?:fr\/|ar\/)?blog(?:\/|$)/.test(route), `Retired Notes route is still published: ${route}`);
}
for (const file of files) {
  check(!file.startsWith('archive/'), `Private archive is published: ${file}`);
}
for (const file of ['og/ai-sovereignty-quebec.png', 'og/astro-for-portfolios-2026.png', 'og/building-aymen-ai.png']) {
  check(!files.has(file), `Retired article image is still published: ${file}`);
}
const sitemapFiles = [...files].filter(file => /^sitemap-\d+\.xml$/.test(file));
check(sitemapFiles.length > 0, 'No generated sitemap found.');
const indexedUrls = new Set();
for (const file of sitemapFiles) {
  const xml = await readFile(join(output, file), 'utf8');
  for (const [, url] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) indexedUrls.add(url);
}
const expectedUrls = new Set([...pages.values()].filter(page => !page.noindex).map(page => `${origin}${page.route}`));
for (const url of expectedUrls) check(indexedUrls.has(url), `Indexable page missing from sitemap: ${url}`);
for (const url of indexedUrls) check(expectedUrls.has(url), `Sitemap contains a retired, missing, or noindex page: ${url}`);
for (const [file, width, height] of [['og/default.png', 1200, 630], ['favicon.png', 32, 32], ['apple-touch-icon.png', 180, 180]]) {
  if (!files.has(file)) { check(false, `Missing image: ${file}`); continue; }
  const data = await readFile(join(output, file));
  check(data.subarray(1, 4).toString() === 'PNG' && data.readUInt32BE(16) === width && data.readUInt32BE(20) === height, `Incorrect PNG dimensions: ${file}`);
}

if (errors.length) {
  console.error(`Site QA failed (${errors.length} findings):\n${errors.map(error => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Site QA passed: ${pages.size} pages; ${linksChecked} local links/assets; EN/FR/AR reciprocal alternates; headings, identity metadata, contact email, and social/icon dimensions.`);
  console.log('Static HTML checks do not replace browser layout, keyboard, or theme verification.');
}

function check(condition, message) { if (!condition) errors.push(message); }
function attr(node, name) { return node?.attrs?.find(attribute => attribute.name === name)?.value || ''; }
function text(node) { return node?.nodeName === '#text' ? node.value : (node?.childNodes || []).map(text).join(''); }
function accessibleText(node) {
  if (!node || attr(node, 'aria-hidden') === 'true') return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(accessibleText).join('');
}
function elements(node) { return [...(node.tagName ? [node] : []), ...(node.childNodes || []).flatMap(elements)]; }
function metadata(page, name) { return attr(page.nodes.find(node => node.tagName === 'meta' && (attr(node, 'name') === name || attr(node, 'property') === name)), 'content'); }
function markedHidden(node) {
  for (let current = node; current; current = current.parentNode) {
    if (current.attrs?.some(attribute => attribute.name === 'hidden') || attr(current, 'aria-hidden') === 'true' || /(?:^|\s)(?:hidden|invisible|sr-only|opacity-0)(?:\s|$)/.test(attr(current, 'class')) || /(?:display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0(?:[;\s]|$))/i.test(attr(current, 'style'))) return true;
  }
  return false;
}
function localizedPath(locale, route) {
  const base = route.replace(/^\/(?:fr|ar)(?=\/|$)/, '') || '/';
  return locale === 'en' ? base : `/${locale}${base}`;
}
async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? collectFiles(join(directory, entry.name)) : relative(output, join(directory, entry.name))))).flat();
}
