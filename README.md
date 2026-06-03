# Portfolio Website

Personal portfolio and blog built with Vite, React, TypeScript, and SCSS Modules.

Live site: https://tadas.baltrunas.lt/

## Requirements

Use Node 22. The pinned local version is in `.nvmrc`.

```bash
nvm use
npm ci
```

## Commands

```bash
npm run dev
npm run build
npm run check
npm run test:e2e
```

`npm run check` runs type checking, linting, formatting checks, unit tests, and the production build.

## Content

- Projects: `src/content/projects/projects.ts`
- Blog posts: `src/content/blog/posts.ts`
- Blog Markdown: `src/content/blog/*.md`
- Site data: `src/content/site.ts`

## Environment

`.env.production` is tracked because it only stores public frontend metadata:

```env
VITE_SITE_URL=https://tadas.baltrunas.lt
```

## Deployment

Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Root path: `/`
