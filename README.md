# Tadas Baltrunas Portfolio

Static personal portfolio and blog site for Tadas Baltrunas.

The project is frontend-only. It has no CMS, backend, API integration, auth, admin panel, or database.

Live site today: [https://tadasba.github.io/Blog/](https://tadasba.github.io/Blog/)

## Stack

- Vite
- React
- TypeScript
- React Router
- SCSS Modules
- Framer Motion
- Vitest
- React Testing Library
- Playwright
- ESLint
- Stylelint
- Prettier

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run test:watch
npm run typecheck
npm run lint
npm run lint:fix
npm run style:lint
npm run style:lint:fix
npm run format
npm run format:check
npm run clean
npm run check
npm run deploy
```

`npm run check` runs type checking, ESLint, Stylelint, tests, and a production build.

## Development

```bash
npm run dev
```

The local Vite server uses `/` as the base path.

## Build

```bash
npm run build
npm run preview
```

Production output is written to `dist/`.

## Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

The production base path is controlled by [.env.production](./.env.production):

```env
VITE_SITE_BASE=/Blog/
```

That matches the current deployment under `https://tadasba.github.io/Blog/`.

To move this project to the root GitHub Pages site at `https://tadasba.github.io/`, change it to:

```env
VITE_SITE_BASE=/
```

## Routing

The app uses `BrowserRouter` with a GitHub Pages SPA fallback.

Supported routes:

- `/`
- `/projects`
- `/projects/:slug`
- `/blog`
- `/blog/:slug`
- `/stack`
- `/about`
- `*` 404 route

`HashRouter` would avoid the fallback file, but it would produce less clean URLs. `BrowserRouter` is a better fit for a professional static portfolio as long as `404.html` is kept in place for GitHub Pages refresh/direct-link behavior.

## Content

Projects live in [src/content/projects/projects.ts](./src/content/projects/projects.ts).

Blog metadata lives in [src/content/blog/posts.ts](./src/content/blog/posts.ts). Markdown bodies live in [src/content/blog](./src/content/blog).

Content uses stable slugs and typed entries. A future CMS can map remote content into the same types without changing page components.

## Structure

```text
src/
  app/
  assets/
  components/
    layout/
    ui/
  content/
    blog/
    projects/
  features/
    blog/
    projects/
  hooks/
  pages/
  routes/
  styles/
  test/
  types/
  utils/
e2e/
scripts/
```

## Styling

Styles use SCSS Modules. Global styles are limited to fonts, reset, body background, base typography, and reduced-motion behavior.

Shared SCSS tokens and mixins live in [src/styles](./src/styles).

## Future Notes

Keep this phase static. Do not add a CMS, API client, backend, auth, or database until there is a clear content workflow that needs it.
