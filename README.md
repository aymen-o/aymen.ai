# aymen.ai

My personal site and developer portfolio → [aymen.ai](https://aymen.ai).

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and a custom WebGL grain shader. Dark-first, monochrome, typographic.

## Stack

- **Framework:** Astro 5.x (content-first, zero JS by default)
- **Styling:** Tailwind CSS v4
- **Typography:** Geist Sans + Geist Mono (self-hosted)
- **Content:** Astro Content Collections + Markdown
- **Linting:** Biome (replaces ESLint + Prettier)
- **Deployment:** Vercel
- **Special:** Custom GLSL film grain shader (WebGL2, ~30 lines, no dependencies)

## Getting Started

```bash
# Clone
git clone https://github.com/aymen-o/aymen.ai.git
cd aymen.ai

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```text
src/
├── components/     # Astro components (Nav, Footer, GrainCanvas, etc.)
├── content/        # Blog posts and project entries (Markdown)
├── layouts/        # Page layouts (Base, Page, BlogPost)
├── lib/            # Constants, utilities, TypeScript types
├── pages/          # Route pages (index, about, blog, projects)
└── styles/         # Global CSS + Tailwind config
public/
├── favicon.svg     # Dark/light aware SVG favicon
└── robots.txt
```

## Features

- **Keyboard navigation:** Press `h`, `a`, `b`, `p` to navigate between pages
- **Tri-state theme:** System / Light / Dark with smooth transitions
- **Film grain shader:** Subtle WebGL2 background that responds to mouse movement
- **Accessible:** Skip-to-content, reduced-motion support, semantic HTML
- **Fast:** Zero client JS except theme toggle and grain shader

## License

MIT
