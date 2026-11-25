import { StatusBadge, Scores } from './badge.js';
import { Progress } from './progress.js';

export const Poster = ({ title, color = '#8E1F2B' }) =>
  `<div class="r-poster" style="--poster:${color}" aria-hidden="true">${title}</div>`;

export const TitleCard = ({ title, meta, status, imdb, rt, progress, posterColor }) =>
  `<article class="r-card">
  ${Poster({ title, color: posterColor })}
  <div class="r-card__body">
    <h3 class="r-card__title"><a href="#">${title}</a></h3>
    <p class="r-card__meta">${meta}</p>
    ${status ? StatusBadge({ status }) : ''}
    ${progress ? Progress(progress) : ''}
    ${imdb || rt ? Scores({ imdb, rt }) : ''}
  </div>
</article>`;
