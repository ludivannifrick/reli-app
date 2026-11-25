// Reads tokens/tokens.json and writes dist/tokens.css and dist/tokens.json (resolved).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const src = JSON.parse(readFileSync(new URL('tokens/tokens.json', root), 'utf8'));

const get = (path) => path.split('.').reduce((o, k) => o?.[k], src);
const resolve = (v) =>
  typeof v === 'string' && v.startsWith('{') ? resolve(get(v.slice(1, -1)).$value) : v;

// Flattens a token group into [['color-bg', '#fff'], ...].
const flatten = (node, prefix = []) =>
  Object.entries(node).flatMap(([k, v]) => {
    if (k.startsWith('$')) return [];
    if (v && typeof v === 'object' && '$value' in v) return [[[...prefix, k].join('-'), resolve(v.$value)]];
    return flatten(v, [...prefix, k]);
  });

const block = (sel, list) => `${sel} {\n${list.map(([k, v]) => `  --${k}: ${v};`).join('\n')}\n}\n`;

const { primitive, theme, ...shared } = src;
const base = flatten(shared);
const light = flatten(theme.light);
const dark = flatten(theme.dark);

const css = `/* Generated from tokens/tokens.json. Do not edit by hand: run \`npm run tokens\`. */
${block(':root, [data-theme="light"]', [...base, ...light])}
${block('[data-theme="dark"]', dark)}
@media (prefers-color-scheme: dark) {
${block(':root:not([data-theme="light"])', dark).replace(/^/gm, '  ').trimEnd()}
}

@media (prefers-reduced-motion: reduce) {
  :root { --motion-duration-fast: 0ms; --motion-duration-base: 0ms; --motion-duration-slow: 0ms; }
}
`;

mkdirSync(new URL('dist/', root), { recursive: true });
writeFileSync(new URL('dist/tokens.css', root), css);
writeFileSync(
  new URL('dist/tokens.json', root),
  JSON.stringify(
    {
      primitive: Object.fromEntries(flatten(primitive.color)),
      light: Object.fromEntries(light),
      dark: Object.fromEntries(dark),
      shared: Object.fromEntries(base),
    },
    null,
    2,
  ) + '\n',
);
console.log(`tokens: ${base.length} shared, ${light.length} per theme`);
