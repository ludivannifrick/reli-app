export const Segmented = ({ label, options, value }) =>
  `<div class="r-segmented" role="group" aria-label="${label}">${options
    .map((o) => `<button type="button" aria-pressed="${o === value}">${o}</button>`)
    .join('')}</div>`;
