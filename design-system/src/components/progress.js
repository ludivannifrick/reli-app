export const Progress = ({ label, value, max }) => {
  const pct = Math.round((value / max) * 100);
  return `<div class="r-progress">
  <div class="r-progress__label"><span>${label}</span><span>${value} de ${max}</span></div>
  <div class="r-progress__track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${value}" aria-valuetext="${value} de ${max} episodios">
    <div class="r-progress__fill" style="width:${pct}%"></div>
  </div>
</div>`;
};
