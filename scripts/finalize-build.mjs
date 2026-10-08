import assert from 'node:assert/strict';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const output = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');

// Astro emits its generated CSP at the end of <head>. Place it after the charset
// so the policy also applies to the blocking theme script and all styles.
await finalizeDirectory(output);

async function finalizeDirectory(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const file = join(directory, entry.name);
		if (entry.isDirectory()) {
			await finalizeDirectory(file);
		} else if (entry.name.endsWith('.html')) {
			const html = await readFile(file, 'utf8');
			const policy = html.match(/<meta\b(?=[^>]*http-equiv=["']content-security-policy["'])[^>]*>/i);
			assert(policy, `Missing generated CSP: ${file}`);
			const withoutPolicy = html.replace(policy[0], '');
			const charset = withoutPolicy.match(/<meta\b[^>]*charset=["'][^"']+["'][^>]*>/i);
			assert(charset, `Missing HTML charset: ${file}`);
			const secured = withoutPolicy.replace(charset[0], `${charset[0]}${policy[0]}`);
			await writeFile(file, secured);
		}
	}
}
