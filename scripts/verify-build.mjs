import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const files = await collectFiles(output);
const pages = files.filter((file) => file.endsWith('.html'));
assert(pages.length > 0, 'The static build must contain HTML pages.');

for (const file of files) {
	const path = relative(output, file);
	assert(!/(^|\/)(?:\.git|\.env[^/]*|node_modules|src)(\/|$)/.test(path), `Private path in build: ${path}`);
	assert(!/\.(?:map|astro|tsx?|mdx?|env|pem|key)$/.test(path), `Source or private file in build: ${path}`);
	assert(!/(^|\/)(?:package(?:-lock)?\.json|astro\.config\.[cm]?js|vercel\.json)$/.test(path), `Build configuration in output: ${path}`);
	if (/\.(?:html|css|js|mjs)$/.test(path)) {
		const contents = await readFile(file, 'utf8');
		assert(!/sourceMappingURL\s*=/.test(contents), `Source map reference in ${path}`);
	}
}

let inlineScripts = 0;
for (const file of pages) {
	const path = relative(output, file);
	const html = await readFile(file, 'utf8');
	assert(!/(?:data-astro-source-(?:file|loc)|\/@fs\/|\/@vite\/)/.test(html), `Development source metadata in ${path}`);
	const cspTag = [...html.matchAll(/<meta\b[^>]*>/gi)].find(([tag]) => attribute(tag, 'http-equiv')?.toLowerCase() === 'content-security-policy');
	assert(cspTag, `Missing Content Security Policy in ${path}`);
	const firstScript = html.search(/<script\b/i);
	assert(firstScript === -1 || cspTag.index < firstScript, `Content Security Policy must precede all scripts in ${path}`);
	const policy = attribute(cspTag[0], 'content');
	assert(policy, `Empty Content Security Policy in ${path}`);
	const directives = new Map(policy.split(';').map((directive) => {
		const [name, ...sources] = directive.trim().split(/\s+/);
		return [name, sources];
	}));
	const scriptSources = directives.get('script-src-elem') || directives.get('script-src');
	assert(scriptSources?.length, `Missing script policy in ${path}`);
	assert(!scriptSources.includes("'unsafe-inline'") && !scriptSources.includes("'unsafe-eval'"), `Unsafe script policy in ${path}`);
	assert(!/\son[a-z]+\s*=/i.test(html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')), `Inline event handler in ${path}`);
	assert(!/\b(?:href|src)\s*=\s*["']\s*javascript:/i.test(html), `JavaScript URL in ${path}`);
	const styleSources = directives.get('style-src-elem') || directives.get('style-src') || [];
	for (const [, contents] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
		assert(matchesHash(contents, styleSources), `An inline stylesheet is blocked by CSP in ${path}`);
	}

	for (const [, attrs, contents] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
		const src = attribute(attrs, 'src');
		if (src) {
			const url = new URL(src, 'https://aymen.ca');
			assert(url.origin === 'https://aymen.ca', `Unexpected third-party script in ${path}`);
			assert(scriptSources.includes("'self'"), `Local scripts are blocked in ${path}`);
			continue;
		}
		const type = attribute(attrs, 'type');
		if (type && !['module', 'text/javascript', 'application/javascript'].includes(type.toLowerCase())) continue;
		if (!contents.trim()) continue;
		inlineScripts++;
		assert(matchesHash(contents, scriptSources), `An inline script is blocked by CSP in ${path}. Register its exact hash through Astro.csp.insertScriptHash().`);
	}
}

const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const headers = vercel.headers.find((entry) => entry.source === '/(.*)')?.headers || [];
const header = (name) => headers.find((entry) => entry.key.toLowerCase() === name.toLowerCase())?.value;
assert(header('Content-Security-Policy')?.includes("frame-ancestors 'none'"), 'Embedding protection must be sent as an HTTP header.');
assert.equal(header('X-Content-Type-Options'), 'nosniff');
assert.equal(header('X-Frame-Options'), 'DENY');

console.log(`Build security checks passed: ${pages.length} pages, ${inlineScripts} permitted inline scripts, no source maps or private build files.`);

async function collectFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? collectFiles(join(directory, entry.name)) : join(directory, entry.name)));
	return nested.flat();
}

function attribute(tag, name) {
	const value = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
	return value ? (value[1] ?? value[2]).replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&') : undefined;
}

function matchesHash(contents, sources) {
	return ['sha256', 'sha384', 'sha512'].some((algorithm) => {
		const hash = createHash(algorithm).update(contents).digest('base64');
		return sources.includes(`'${algorithm}-${hash}'`);
	});
}
