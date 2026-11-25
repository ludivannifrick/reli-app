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

A separate Vercel project (Hobby) with root directory `design-system`, build command `npm run build-storybook` and output directory `storybook-static`.
