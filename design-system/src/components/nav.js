import { icon } from './icons.js';

export const tabs = [
  { id: 'library', label: 'Mi videoteca', icon: 'home' },
  { id: 'foryou', label: 'Para vos', icon: 'sparkle' },
  { id: 'friends', label: 'Amigos', icon: 'friends' },
];

export const BottomNav = ({ current = 'library' }) =>
  `<nav class="r-nav" aria-label="Principal">${tabs
    .map(
      (t) => `<a href="#"${t.id === current ? ' aria-current="page"' : ''}><span class="r-nav__icon">${icon(t.icon)}</span>${t.label}</a>`,
    )
    .join('')}</nav>`;
