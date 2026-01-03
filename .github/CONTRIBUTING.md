# Contributing to PHP Debugger Forensics

Thanks for your interest! Here's how to get started:

## Setup

1. Fork the repo
2. Clone locally: `git clone https://github.com/YOUR_FORK/PhpDebugger.git`
3. Install dependencies: `cd src && npm install`
4. Dev server: `npm run dev`

## Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test in the extension (`npm run build`, then reload in Chrome)
3. Commit with clear messages
4. Push and open a PR

## Code Style

- TypeScript strict mode enforced
- ESLint config provided
- Tailwind for styling

## Releasing

- Bump version in `src/package.json` and `manifest.json`
- Update `CHANGELOG.md`
- Push to `main` → GitHub Actions handles the rest
