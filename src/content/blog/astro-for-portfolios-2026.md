---
title: "Why this portfolio uses Astro"
description: "Static pages, Markdown, and a little JavaScript: the choices behind this site."
date: 2026-02-15
updated: 2026-10-08
locale: en
translationKey: astro-for-portfolios-2026
tags: ["Astro", "Web"]
draft: false
---

This site has a small job: explain what I do, show a few projects, and give people a way to reach me. Most of its content is text. That makes a static site a practical fit.

## Pages first

Astro builds the pages ahead of time. The browser receives HTML for the content, with CSS for the layout and a little JavaScript for interactions such as the theme controls and navigation.

The useful distinction here is between reading and interacting. Reading an article or following a project link should work without waiting for an application to start. The interactive parts can stay small.

## Content alongside the code

The articles and project descriptions live in Markdown files. Each has structured fields for its title, description, language, and other metadata. Astro's content collections check those fields during the build.

For a site this size, editing a file is enough. There is no separate publishing dashboard or database to maintain. A larger editorial team would have different needs.

## Three languages, separate pages

English, French, and Arabic each have their own pages. A language switch links to the equivalent page, and Arabic uses a right-to-left layout. Keeping translations in the content files makes it possible to review the wording as part of a site update.

Translation is more than changing a navigation label. Page titles, descriptions, dates, accessibility labels, and reading order all need attention too.

## A deliberately small setup

Astro fits this particular site because the content changes occasionally and most visitors are here to read. I do not need the same architecture I would choose for a signed-in product with live data.

The goal is straightforward: make the site easy to read, easy to update, and quick to open. The framework helps with that, but the content and the details still need work.
