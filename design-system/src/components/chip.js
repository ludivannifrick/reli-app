import { icon } from './icons.js';

export const Chip = ({ label, selected = false }) =>
  `<button type="button" class="r-chip" aria-pressed="${selected}">${icon('check')}<span>${label}</span></button>`;

export const ChipGroup = ({ label, options, selected = [] }) =>
  `<div class="r-chips" role="group" aria-label="${label}">${options
    .map((o) => Chip({ label: o, selected: selected.includes(o) }))
    .join('')}</div>`;
