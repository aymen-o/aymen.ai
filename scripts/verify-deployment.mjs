import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { parse } from 'parse5';

const productionOrigin = 'https://aymen.ca';
const locales = [{ prefix: '', lang: 'en', dir: 'ltr' }, { prefix: '/fr', lang: 'fr', dir: 'ltr' }, { prefix: '/ar', lang: 'ar', dir: 'rtl' }];
const retiredPaths = locales.flatMap(({ prefix }) => ['blog/', 'blog/astro-for-portfolios-2026/', 'blog/building-aymen-ai/'].map(path => `${prefix}/${path}`));
const missingPath = '/__portfolio-verification-missing-page__/';
const privatePaths = ['/.env', '/.git/config', '/package.json', '/src/layouts/BaseLayout.astro'];

// Preview deployments serve the same site, so canonicals intentionally keep the
// production origin even when the requested deployment has a Vercel hostname.
export async function verifyDeployment(deploymentUrl, { fetchImpl = globalThis.fetch, protectionBypass } = {}) {
	const base = new URL(deploymentUrl);
	assert.equal(base.protocol, 'https:', 'Deployment checks require HTTPS.');
	assert(!base.username && !base.password, 'Do not pass credentials in the deployment URL.');
	assert(base.pathname === '/' && !base.search && !base.hash, 'Pass the deployment origin without a path, query, or fragment.');
	const requestHeaders = protectionBypass ? { 'x-vercel-protection-bypass': protectionBypass } : {};
	let pages = 0;

	async function request(path, { allowPrivateSlashRedirect = false } = {}) {
		const expectedUrl = new URL(path, base);
		const send = url => fetchImpl(url, {
			headers: requestHeaders,
			// Never follow redirects automatically or forward credentials across origins.
			redirect: 'manual',
			signal: AbortSignal.timeout(15_000),
		});
		let response = await send(expectedUrl);
		try {
			verifyResponseUrl(response, expectedUrl, path);
			if (allowPrivateSlashRedirect && [301, 308].includes(response.status)) {
				// Vercel normalizes extensionless paths such as /.git/config. Allow
				// only that one same-origin slash normalization, never an arbitrary
				// redirect, query change, alternate host, or second redirect.
				const canonicalUrl = new URL(expectedUrl);
				canonicalUrl.pathname += '/';
				const location = response.headers.get('location');
				assert(location, `${path}: private-path redirect has no location`);
				const target = new URL(location, expectedUrl);
				assert.equal(target.href, canonicalUrl.href, `${path}: unexpected private-path redirect target`);
				await discardBody(response);
				response = await send(target);
				verifyResponseUrl(response, target, path);
			}
			assert(!(response.status >= 300 && response.status < 400), `${path}: unexpected redirect`);
			return response;
		} catch (error) {
			await discardBody(response);
			throw error;
		}
	}

	for (const { prefix, lang, dir } of locales) {
		for (const route of ['/', '/about/', '/projects/']) {
			const path = `${prefix}${route}`;
			const response = await request(path);
			try {
				assert.equal(response.status, 200, `${path}: expected a public page`);
				verifySecurityHeaders(response.headers, path);
				const html = await response.text();
				const nodes = elements(parse(html, { sourceCodeLocationInfo: true }));
				const document = nodes.find(node => node.tagName === 'html');
				assert.equal(attribute(document, 'lang'), lang, `${path}: incorrect document language`);
				assert.equal(attribute(document, 'dir'), dir, `${path}: incorrect writing direction`);
				const canonicals = nodes.filter(node => node.tagName === 'link' && attribute(node, 'rel').split(/\s+/).includes('canonical'));
				assert.equal(canonicals.length, 1, `${path}: expected exactly one canonical`);
				assert.equal(attribute(canonicals[0], 'href'), `${productionOrigin}${path}`, `${path}: incorrect production canonical`);
				const policies = nodes.filter(node => node.tagName === 'meta' && attribute(node, 'http-equiv').toLowerCase() === 'content-security-policy');
				assert.equal(policies.length, 1, `${path}: expected exactly one resource policy`);
				assert(attribute(policies[0], 'content').trim(), `${path}: empty resource policy`);
				const firstScript = nodes.find(node => node.tagName === 'script');
				assert(!firstScript || policies[0].sourceCodeLocation.startOffset < firstScript.sourceCodeLocation.startOffset, `${path}: policy appears after a script`);
				pages++;
			} finally {
				await discardBody(response);
			}
		}
	}

	for (const path of [...retiredPaths, missingPath]) {
		const response = await request(path);
		try {
			assert.equal(response.status, 404, `${path}: expected a genuine 404`);
		} finally {
			await discardBody(response);
		}
	}
	for (const path of privatePaths) {
		const response = await request(path, { allowPrivateSlashRedirect: true });
		try {
			assert([403, 404].includes(response.status), `Private source probe must be blocked or absent: ${path}`);
		} finally {
			await discardBody(response);
		}
	}

	return { hostname: base.hostname, pages, retiredRoutes: retiredPaths.length, privatePaths: privatePaths.length };
}

function verifyResponseUrl(response, expectedUrl, path) {
	assert.equal(response.url, expectedUrl.href, `${path}: unexpected final URL`);
	assert(!response.redirected, `${path}: unexpected redirect`);
}

async function discardBody(response) {
	if (response.body && !response.bodyUsed) await response.body.cancel();
}

function verifySecurityHeaders(headers, path) {
	assert(headers.get('content-type')?.includes('text/html'), `${path}: incorrect HTML content type`);
	assert.equal(headers.get('x-content-type-options'), 'nosniff', `${path}: missing MIME protection`);
	assert.equal(headers.get('x-frame-options'), 'DENY', `${path}: missing frame protection`);
	assert(headers.get('content-security-policy')?.includes("frame-ancestors 'none'"), `${path}: missing frame-ancestors response header`);
	assert(headers.get('strict-transport-security')?.match(/max-age=([0-9]+)/)?.[1] >= 31536000, `${path}: missing HTTPS policy`);
	assert.equal(headers.get('referrer-policy'), 'strict-origin-when-cross-origin', `${path}: missing referrer policy`);
	assert(headers.get('permissions-policy')?.includes('camera=()'), `${path}: missing permissions policy`);
}

function attribute(node, name) {
	return node?.attrs?.find(attribute => attribute.name === name)?.value || '';
}

function elements(node) {
	return [...(node.tagName ? [node] : []), ...(node.childNodes || []).flatMap(elements)];
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	assert(process.argv[2], 'Usage: npm run verify:deployment -- https://your-deployment.example');
	const result = await verifyDeployment(process.argv[2], { protectionBypass: process.env.VERCEL_AUTOMATION_BYPASS_SECRET });
	console.log(`HTTPS deployment checks passed for ${result.hostname}: ${result.pages} routes in three languages, production canonicals, security headers, early CSP, ${result.retiredRoutes} retired routes and unknown-page 404s, and private-path protection.`);
}
