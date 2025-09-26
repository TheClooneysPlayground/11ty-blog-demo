# 11ty Subspace Builder

A warp-speed Eleventy blog starter powered by Tachyons utility classes. It ships with theme switching, accessible navigation, and a flexible layout that adapts to small and large viewports.

## Features
- Powered by Eleventy 3 with Markdown-it and auto-generated heading anchors
- Tachyons-based, theme-aware typography and color palettes with preview buttons
- Recursive Eleventy Navigation sidebar with responsive hamburger toggle
- Reusable post list macro that trims excerpts and formats dates
- YAML-driven site metadata, theme presets, and animation timing controls

## Quick Start
### Prerequisites
- Node.js 18 or newer

### Installation
```bash
npm install
```

### Local development
```bash
npx @11ty/eleventy --serve
```
Visit `http://localhost:8080` (default) to browse the site. Theme selections persist in `localStorage` so you can preview skins as you work.

### Production build
```bash
npx @11ty/eleventy
```
The static output is written to the `_site/` directory. Deploy those files to any static host or CDN.

## Project Structure
- `_data/` - Global data files (`site.yaml` and `themes.yaml`) that drive metadata, theme options, and animation settings.
- `_includes/layouts/` - Base and page layouts, including the responsive navigation + theme selector UI in `home.njk`.
- `_includes/components/` - Shareable Nunjucks macros like `post-list.njk` for rendering excerpts.
- `posts/` - Blog posts and collection defaults (`posts.json` assigns the home layout to the collection).
- `eleventy.config.js` - Eleventy configuration, Markdown-it setup, and custom filters (`readableDate`, `machineDate`, `excerpt`).
- `index.md` - Home page content that also uses the `home` layout.

## Configuration
### Site settings (`_data/site.yaml`)
- `title`, `url`, and author contact details.
- `theme` block toggles the selector (`showSelectors`), controls animation timings, and sets the default theme (`defaultId`).

### Theme presets (`_data/themes.yaml`)
Add, remove, or tweak Tachyons class pairs here. Each theme entry accepts:
- `id` - Unique identifier used for persistence and data attributes.
- `classes` - Tachyons classes applied to `html` when the theme is active.
- `midtoneClass` - Optional class used to recolor elements tagged with `.theme-midtone`.

## Writing Content
Create a new Markdown file in `posts/` with front matter similar to:
```markdown
---
title: My Next Adventure
date: 2025-02-01
eleventyNavigation:
  key: my-next-adventure
  parent: posts
excerpt: |
  A quick teaser paragraph that appears in post lists.
---

Your post content starts here. Eleventy handles Markdown -> HTML conversion.
```
Posts automatically pick up the layout defined in `posts/posts.json`. The `excerpt` field is optional; without it, the `excerpt` filter trims the rendered HTML.

## Components & Enhancements
- Use `{% from "components/post-list.njk" import renderPostList %}` inside a template to render a list of collection items with consistent styling.
- The `home.njk` layout wraps page content in a `<heading-anchors>` element to enable anchored headings and theme-aware typography.

## Deployment Tips
- Set `ELEVENTY_ENV=production` when building for production to leverage Eleventy’s environment-based defaults.
- Because Tachyons is loaded from a CDN, ensure outbound requests are allowed by your host or replace the `<link>` in `base.njk` with a bundled stylesheet.

## License
MIT License - see [`LICENSE`](LICENSE).
