import assert from 'node:assert/strict';
import test from 'node:test';
import { verifyDeployment } from './verify-deployment.mjs';

const deployment = 'https://portfolio-preview.vercel.app';
const production = 'https://aymen.ca';
const corePaths = ['/', '/about/', '/projects/', '/fr/', '/fr/about/', '/fr/projects/', '/ar/', '/ar/about/', '/ar/projects/'];
const retiredPaths = ['', '/fr', '/ar'].flatMap(prefix => ['blog/', 'blog/astro-for-portfolios-2026/', 'blog/building-aymen-ai/'].map(path => `${prefix}/${path}`));
const privatePaths = ['/.env', '/.git/config', '/package.json', '/src/layouts/BaseLayout.astro'];
const securityHeaders = {
	'content-type': 'text/html; charset=utf-8',
	'x-content-type-options': 'nosniff',
	'x-frame-options': 'DENY',
	'content-security-policy': "frame-ancestors 'none'",
	'strict-transport-security': 'max-age=31536000',
	'referrer-policy': 'strict-origin-when-cross-origin',
	'permissions-policy': 'camera=()',
};

function publicHtml(path, { lang = path.startsWith('/fr/') ? 'fr' : path.startsWith('/ar/') ? 'ar' : 'en', dir = lang === 'ar' ? 'rtl' : 'ltr', canonical = `${production}${path}`, lateCsp = false } = {}) {
	const policy = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\'">';
	return `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8">${lateCsp ? '<script src="/site.js"></script>' : ''}${policy}<link rel="canonical" href="${canonical}"></head><body><h1>Portfolio</h1></body></html>`;
}

function response(url, { status = 200, body = '', headers = securityHeaders, redirected = false } = {}) {
	const result = new Response(body, { status, headers });
	Object.defineProperties(result, { url: { value: String(url) }, redirected: { value: redirected } });
	return result;
}

function mockFetch(overrides = {}) {
	const calls = [];
	return {
		calls,
		fetchImpl: async (url, options) => {
			calls.push({ url: String(url), options });
			const path = new URL(url).pathname;
			if (overrides[path]) return overrides[path](url, options);
			return corePaths.includes(path)
				? response(url, { body: publicHtml(path) })
				: response(url, { status: 404 });
		},
	};
}

test('verifies every localized route on a preview with production canonicals and all 404/private probes', async () => {
	const mock = mockFetch({ '/.env': url => response(url, { status: 403 }) });
	const result = await verifyDeployment(deployment, mock);
	assert.equal(result.pages, 9);
	assert.equal(result.retiredRoutes, 9);
	const paths = mock.calls.map(call => new URL(call.url).pathname);
	for (const path of [...corePaths, ...retiredPaths, ...privatePaths, '/__portfolio-verification-missing-page__/']) assert(paths.includes(path), `${path} was not requested`);
	assert.equal(paths.length, 23);
	assert(mock.calls.every(call => call.options.redirect === 'manual'));
});

test('rejects a locale redirect without requesting its destination or forwarding the bypass header', async () => {
	const mock = mockFetch({ '/fr/': url => response(url, { status: 302, headers: { location: 'https://unexpected.example/' } }) });
	await assert.rejects(verifyDeployment(deployment, { ...mock, protectionBypass: 'harmless-test-value' }), /\/fr\/: unexpected redirect/);
	assert.equal(mock.calls.length, 4);
	assert(mock.calls.every(call => new URL(call.url).origin === deployment));
	assert(mock.calls.every(call => call.options.redirect === 'manual'));
	assert(mock.calls.every(call => call.options.headers['x-vercel-protection-bypass'] === 'harmless-test-value'));
});

test('rejects an already followed response that ends at the wrong URL', async () => {
	const mock = mockFetch({ '/fr/': () => response(`${deployment}/`, { body: publicHtml('/'), redirected: true }) });
	await assert.rejects(verifyDeployment(deployment, mock), /\/fr\/: unexpected final URL/);
});

for (const status of [301, 308]) {
	test(`allows one ${status} private-probe redirect to its exact same-origin trailing-slash URL`, async () => {
		let redirectResponse;
		const mock = mockFetch({ '/.git/config': url => {
			redirectResponse = response(url, { status, headers: { location: '/.git/config/' } });
			return redirectResponse;
		} });
		await verifyDeployment(deployment, { ...mock, protectionBypass: 'harmless-test-value' });
		const probeCalls = mock.calls.filter(call => new URL(call.url).pathname.startsWith('/.git/config'));
		assert.deepEqual(probeCalls.map(call => call.url), [`${deployment}/.git/config`, `${deployment}/.git/config/`]);
		assert(probeCalls.every(call => call.options.redirect === 'manual'));
		assert.equal(redirectResponse.bodyUsed, true, 'The intermediate response body must be discarded.');
	});
}

for (const location of ['https://unexpected.example/.git/config/', '/.git/config/?extra=value', '/other-path/']) {
	test(`does not follow an unexpected private-probe redirect to ${location}`, async () => {
		let redirectResponse;
		const mock = mockFetch({ '/.git/config': url => {
			redirectResponse = response(url, { status: 308, headers: { location } });
			return redirectResponse;
		} });
		await assert.rejects(verifyDeployment(deployment, { ...mock, protectionBypass: 'harmless-test-value' }), /unexpected private-path redirect target/);
		assert(mock.calls.every(call => new URL(call.url).origin === deployment));
		assert.equal(mock.calls.at(-1).url, `${deployment}/.git/config`);
		assert.equal(redirectResponse.bodyUsed, true, 'The rejected response body must be discarded.');
	});
}

test('rejects a second private-probe redirect without requesting its destination', async () => {
	const redirects = [];
	const mock = mockFetch({
		'/.git/config': url => {
			const result = response(url, { status: 308, headers: { location: '/.git/config/' } });
			redirects.push(result);
			return result;
		},
		'/.git/config/': url => {
			const result = response(url, { status: 308, headers: { location: 'https://unexpected.example/' } });
			redirects.push(result);
			return result;
		},
	});
	await assert.rejects(verifyDeployment(deployment, { ...mock, protectionBypass: 'harmless-test-value' }), /unexpected redirect/);
	assert.equal(mock.calls.at(-1).url, `${deployment}/.git/config/`);
	assert(mock.calls.every(call => new URL(call.url).origin === deployment));
	assert(redirects.every(result => result.bodyUsed));
});

test('rejects a temporary private-probe redirect even to the canonical slash URL', async () => {
	const mock = mockFetch({ '/.git/config': url => response(url, { status: 302, headers: { location: '/.git/config/' } }) });
	await assert.rejects(verifyDeployment(deployment, mock), /unexpected redirect/);
	assert.equal(mock.calls.at(-1).url, `${deployment}/.git/config`);
});

test('rejects a private file exposed after allowed slash normalization', async () => {
	const mock = mockFetch({
		'/.git/config': url => response(url, { status: 308, headers: { location: '/.git/config/' } }),
		'/.git/config/': url => response(url, { body: 'private repository config' }),
	});
	await assert.rejects(verifyDeployment(deployment, mock), /Private source probe must be blocked or absent/);
});

for (const [name, path, changes, error] of [
	['English served at a French URL', '/fr/about/', { lang: 'en' }, /incorrect document language/],
	['wrong Arabic direction', '/ar/projects/', { dir: 'ltr' }, /incorrect writing direction/],
	['wrong locale canonical', '/fr/projects/', { canonical: `${production}/projects/` }, /incorrect production canonical/],
	['preview hostname in canonical', '/about/', { canonical: `${deployment}/about/` }, /incorrect production canonical/],
	['CSP after a script', '/ar/', { lateCsp: true }, /policy appears after a script/],
]) {
	test(`rejects ${name}`, async () => {
		const mock = mockFetch({ [path]: url => response(url, { body: publicHtml(path, changes) }) });
		await assert.rejects(verifyDeployment(deployment, mock), error);
	});
}

test('rejects a missing localized non-home route', async () => {
	const mock = mockFetch({ '/ar/about/': url => response(url, { status: 404 }) });
	await assert.rejects(verifyDeployment(deployment, mock), /\/ar\/about\/: expected a public page/);
});

test('rejects missing security headers on a non-home route', async () => {
	const headers = { ...securityHeaders };
	delete headers['x-frame-options'];
	const mock = mockFetch({ '/projects/': url => response(url, { body: publicHtml('/projects/'), headers }) });
	await assert.rejects(verifyDeployment(deployment, mock), /\/projects\/: missing frame protection/);
});

for (const path of ['/fr/blog/building-aymen-ai/', '/__portfolio-verification-missing-page__/']) {
	test(`rejects a soft 404 at ${path}`, async () => {
		const mock = mockFetch({ [path]: url => response(url, { body: publicHtml('/') }) });
		await assert.rejects(verifyDeployment(deployment, mock), /expected a genuine 404/);
	});
}

test('rejects a publicly served private file', async () => {
	const mock = mockFetch({ '/package.json': url => response(url, { body: '{}' }) });
	await assert.rejects(verifyDeployment(deployment, mock), /Private source probe must be blocked or absent/);
});

test('refuses insecure origins and URL credentials before making a request', async () => {
	const mock = mockFetch();
	await assert.rejects(verifyDeployment('http://aymen.ca', mock), /require HTTPS/);
	await assert.rejects(verifyDeployment('https://user:password@aymen.ca', mock), /Do not pass credentials/);
	assert.equal(mock.calls.length, 0);
});
