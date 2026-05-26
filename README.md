# josep-audenis.github.io

Personal website and portfolio built with React, Vite, TypeScript, Tailwind CSS,
and pnpm. Designed as a dark, slide-style static site for GitHub Pages.

## Development

Install dependencies:

```bash
pnpm install
```

Run local dev server:

```bash
pnpm dev
```

Build production output:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## Structure

- `src/components/sections`: full-screen website sections.
- `src/components/ui`: reusable UI and motion components.
- `src/index.css`: global theme tokens, slide snapping, and animation styles.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.

## Deployment

Pushes to `main` trigger GitHub Actions. The workflow installs dependencies with
pnpm, builds `dist`, and deploys the artifact to GitHub Pages.
