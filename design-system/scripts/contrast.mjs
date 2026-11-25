// Fails if any token pair in src/lib/pairs.js misses its WCAG AA minimum, in either theme.
import { readFileSync } from 'node:fs';
import { contrast } from '../src/lib/contrast.js';
import { pairs } from '../src/lib/pairs.js';

const tokens = JSON.parse(readFileSync(new URL('../dist/tokens.json', import.meta.url), 'utf8'));
let failed = 0;

for (const theme of ['light', 'dark']) {
  console.log(`\n${theme}`);
  for (const [fg, bg, min, use] of pairs) {
    const ratio = contrast(tokens[theme][`color-${fg}`], tokens[theme][`color-${bg}`]);
    const ok = ratio >= min;
    if (!ok) failed++;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}  ${use}`);
  }
}

if (failed) {
  console.error(`\n${failed} pair(s) below WCAG AA`);
  process.exit(1);
}
console.log('\nAll pairs meet WCAG AA');
