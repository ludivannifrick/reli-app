import { Button } from './button.js';

export const EmptyState = ({ title, text, voice, action, art = 'reli-asomado.svg' }) =>
  `<section class="r-empty">
  <img src="${art}" alt="">
  ${voice ? `<p class="r-voice">${voice}</p>` : ''}
  <h2 class="r-empty__title">${title}</h2>
  <p class="r-empty__text">${text}</p>
  ${action ? Button({ label: action, iconName: 'search' }) : ''}
</section>`;
