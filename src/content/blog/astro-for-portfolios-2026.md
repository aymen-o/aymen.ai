---
title: "Why Astro is the right choice for dev portfolios in 2026"
description: "A practical comparison of Astro vs Next.js, Remix, and Hugo for developer portfolios — and why content-first wins."
date: 2026-02-15
tags: ["astro", "web-dev", "opinion"]
draft: false
---

Every few months, someone on X asks: "What should I use for my personal site?" The replies are predictable ; Next.js fans say Next, Hugo fans say Hugo, and someone always suggests raw HTML.

Here's my take after building with all of them: **Astro wins for developer portfolios in 2026**, and it's not close.

## The Content-First Advantage

A portfolio is fundamentally a content site. Blog posts, project descriptions, an about page. You don't need React hydration for a list of links. You don't need server-side rendering for static prose.

Astro ships zero JavaScript by default. Your Lighthouse score starts at 100 and you work to keep it there, rather than starting at 60 and fighting your framework.

## Islands When You Need Them

The one interactive element on aymen.ai is the theme toggle. That's a single Astro island, a few kilobytes of client-side JavaScript, loaded only when needed. Everything else is static HTML and CSS.

Compare this to Next.js, where your entire page is a React component even if it's just rendering markdown. The bundle tax is real, and for a portfolio, it's pure waste.

## Content Collections Are Underrated

Astro's content collections give you type-safe frontmatter validation, automatic slug generation, and reading time calculation, all at build time. No CMS, no database, no API calls. Just markdown files and TypeScript schemas.

## The Verdict

If you're building a SaaS app, use Next.js. If you're building a developer portfolio, blog, or documentation site, Astro is the answer. It optimizes for the right things: performance, simplicity, and content.
