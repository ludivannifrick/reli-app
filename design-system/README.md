# Reli design system

Tokens, components and docs for Reli, presented in Storybook.

- `tokens/tokens.json` is the single source of truth (DTCG-style). `npm run tokens` builds `dist/tokens.css` and `dist/tokens.json`.
- `npm run contrast` checks every color pair the components use against WCAG AA, in both themes, and fails on any miss.
- Components are plain HTML, CSS and JS, like the app. Each one is a function that returns markup, styled with `r-` prefixed classes.

## Scripts

```
npm install
npm run storybook        # docs at localhost:6006
npm run build-storybook  # tokens + contrast check + static build in storybook-static/
```

## Deploy

Deployed with the app on the same Vercel project. `vercel.json` at the repo root runs `scripts/build-site.sh`, which serves the app at `/` and this Storybook at `/design-system/`.
