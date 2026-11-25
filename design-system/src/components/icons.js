// Inline icon set. 24px grid, 2px stroke, round caps. Decorative by default (aria-hidden).
const paths = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  bookmark: '<path d="M7 4h10v16l-5-3.5L7 20z"/>',
  play: '<path d="M8 5.5v13l10-6.5z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  home: '<path d="M4 10.5 12 4l8 6.5V20h-5v-6h-6v6H4z"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  friends: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4 2 4 5"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5v.01"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
};

export const icon = (name, { label, className = 'r-icon' } = {}) =>
  `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${
    label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'
  }>${paths[name]}</svg>`;

export const iconNames = Object.keys(paths);
