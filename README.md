# Portfolio website project

Personal portfolio and blog built with Vite, React, TypeScript, and SCSS Modules.

Live site: https://tadas.baltrunas.lt/

## Run

```bash
npm install
npm run dev
```

## Commands

```bash
npm run dev
npm run build
npm run check
```

`npm run check` runs type checking, linting, tests, and the production build.

## Content

- Projects: `src/content/projects/projects.ts`
- Blog posts: `src/content/blog/posts.ts`
- Blog Markdown: `src/content/blog/*.md`
- Site data: `src/content/site.ts`

## Deployment

Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Node version: 20+

Production environment:

```env
VITE_SITE_BASE=/
VITE_SITE_URL=https://tadas.baltrunas.lt
```
