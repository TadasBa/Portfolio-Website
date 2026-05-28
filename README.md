# Tadas Baltrūnas Portfolio

Static personal portfolio and blog site.

Frontend only: no CMS, backend, database, auth, admin panel, or API integration.

## Stack

- Vite
- React
- TypeScript
- React Router
- SCSS Modules
- Vitest / React Testing Library
- Playwright
- ESLint / Stylelint / Prettier

## Run

```bash
npm install
npm run dev
```

## Useful Commands

```bash
npm run build
npm run preview
npm run test
npm run test:e2e
npm run lint
npm run style:lint
npm run typecheck
npm run check
```

`npm run check` runs typecheck, linting, tests, and build.

## Content

- Projects: `src/content/projects/projects.ts`
- Blog metadata: `src/content/blog/posts.ts`
- Blog body: `src/content/blog/*.md`
- Shared site data: `src/content/site.ts`

Content uses stable slugs and typed entries.

## Deployment

Cloudflare Pages:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Node version: 20+

The site is intended to run at the root of the custom domain:

```text
https://tadas.baltrunas.lt/
```

Cloudflare serves direct routes through `public/_redirects`.

Set the production environment variables:

```env
VITE_SITE_BASE=/
VITE_SITE_URL=https://tadas.baltrunas.lt
```

TODO: add `public/og-image.png` before final launch if a social preview image is needed.
