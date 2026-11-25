let n = 0;

// Personal rating: 1 to 5 of the user's own emoji. Native radios, so arrows and screen readers work for free.
export const Rating = ({ label = 'Tu puntaje', emoji = '🍿', value = 0 }) => {
  const name = `r-rating-${++n}`;
  const items = [1, 2, 3, 4, 5]
    .map(
      (i) => `<label><input type="radio" name="${name}" value="${i}" aria-label="${i} de 5"${i === value ? ' checked' : ''}><span${
        i > value ? ' data-off' : ''
      } aria-hidden="true">${emoji}</span></label>`,
    )
    .join('');
  return `<fieldset class="r-rating"><legend>${label}</legend><div class="r-rating__row">${items}<span class="r-rating__value" aria-hidden="true">${
    value ? `${value} de 5` : 'Sin puntaje'
  }</span></div></fieldset>`;
};

// Read-only version, used on friends' recommendations.
export const RatingRead = ({ emoji = '🍿', value }) =>
  `<span class="r-rating-read" role="img" aria-label="${value} de 5">${emoji.repeat(value)}</span>`;
