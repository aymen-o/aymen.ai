---
title: "Building aymen.ai → Why I open-sourced my portfolio"
description: "The decisions behind building a developer portfolio from scratch with Astro, and why every line of code is public."
date: 2026-03-19
tags: ["astro", "open-source", "portfolio"]
draft: false
---

Most developer portfolios are either over-engineered showcases of animation libraries or underwhelming single-page templates. I wanted something different ; a site where the code quality *is* the portfolio.

## Why Open Source?

When a technical reviewer lands on your site, the first thing they do is open DevTools. The second thing they do is check if there's a GitHub link. If both are clean, you've already passed the first filter.

By open-sourcing aymen.ai, every architectural decision is visible. The commit history tells a story. The file structure signals taste. And anyone can fork it, learn from it, or call out mistakes.

## The Stack

I chose Astro because it's the right tool for content-first sites in 2026. Zero JavaScript by default, island architecture for interactivity, and built-in content collections that make blogging feel native.

Tailwind v4 handles styling. Biome replaces ESLint and Prettier with a single, faster tool. And a custom WebGL grain shader adds the one moment of visual polish that proves the restraint everywhere else was a choice.

## What's Next

This is a living project. I'll be adding blog posts about the AI tools I'm building and the lessons learned from experimenting.

The source is at [github.com/aymen-o/aymen.ai](https://github.com/aymen-o/aymen.ai). Star it, fork it, or tell me what I got wrong.
