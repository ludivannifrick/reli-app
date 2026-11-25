import { icon } from './icons.js';

// Watch status: icon + word, so it reads the same without color.
export const statuses = {
  want: { label: 'Quiero verla', icon: 'bookmark' },
  watching: { label: 'Viendo', icon: 'play' },
  watched: { label: 'Vista', icon: 'check' },
};

export const StatusBadge = ({ status = 'want' }) => {
  const s = statuses[status];
  return `<span class="r-status r-status--${status}">${icon(s.icon)}${s.label}</span>`;
};

// Third-party scores. The source is always written out; no logos-only or color-only cues.
export const Score = ({ source, value }) =>
  `<span class="r-score"><span class="r-score__source">${source}</span> <b>${value}</b></span>`;

export const Scores = ({ imdb, rt }) =>
  `<div class="r-scores">${imdb ? Score({ source: 'IMDb', value: imdb }) : ''}${rt ? Score({ source: 'Rotten Tomatoes', value: rt }) : ''}</div>`;
