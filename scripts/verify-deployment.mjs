import assert from 'node:assert/strict';

assert(process.argv[2], 'Usage: npm run verify:deployment -- https://your-deployment.example');
const base = new URL(process.argv[2]);
assert.equal(base.protocol, 'https:', 'Deployment checks require HTTPS.');
assert(!base.username && !base.password, 'Do not pass credentials in the deployment URL.');
const requestHeaders = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
	? { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET }
	: {};

for (const path of ['/', '/fr/', '/ar/']) {
	const response = await request(path);
	assert.equal(response.status, 200, `${path}: expected a public page`);
	const headers = response.headers;
	assert(headers.get('content-type')?.includes('text/html'), `${path}: incorrect HTML content type`);
	assert.equal(headers.get('x-content-type-options'), 'nosniff', `${path}: missing MIME protection`);
	assert.equal(headers.get('x-frame-options'), 'DENY', `${path}: missing frame protection`);
	assert(headers.get('content-security-policy')?.includes("frame-ancestors 'none'"), `${path}: missing frame-ancestors response header`);
	assert(headers.get('strict-transport-security')?.match(/max-age=([0-9]+)/)?.[1] >= 31536000, `${path}: missing HTTPS policy`);
	assert.equal(headers.get('referrer-policy'), 'strict-origin-when-cross-origin', `${path}: missing referrer policy`);
	assert(headers.get('permissions-policy')?.includes('camera=()'), `${path}: missing permissions policy`);
	const html = await response.text();
	const policy = html.match(/<meta\b(?=[^>]*http-equiv=["']content-security-policy["'])[^>]*>/i);
	assert(policy, `${path}: missing generated resource policy`);
	const firstScript = html.search(/<script\b/i);
	assert(firstScript === -1 || policy.index < firstScript, `${path}: policy appears after a script`);
}

for (const path of ['/.env', '/.git/config', '/package.json', '/src/layouts/BaseLayout.astro']) {
	const response = await request(path);
	assert([403, 404].includes(response.status), `Private source probe must be blocked or absent: ${path}`);
}

console.log(`HTTPS deployment checks passed for ${base.hostname}: three languages, security headers, early CSP, and private-path protection.`);

function request(path) {
	return fetch(new URL(path, base), {
		headers: requestHeaders,
		redirect: 'follow',
		signal: AbortSignal.timeout(15_000),
	});
}
