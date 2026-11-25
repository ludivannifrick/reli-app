import { icon } from './icons.js';
import { IconButton } from './button.js';

let n = 0;

export const TextField = ({ label, hint, error, placeholder = '', value = '', multiline = false, disabled = false }) => {
  const id = `r-field-${++n}`;
  const described = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ');
  const attrs = `id="${id}" class="r-input" placeholder="${placeholder}"${described ? ` aria-describedby="${described}"` : ''}${
    error ? ' aria-invalid="true"' : ''
  }${disabled ? ' disabled' : ''}`;
  const control = multiline ? `<textarea ${attrs}>${value}</textarea>` : `<input ${attrs} value="${value}">`;
  return `<div class="r-field">
  <label class="r-field__label" for="${id}">${label}</label>
  ${hint ? `<span class="r-field__hint" id="${id}-hint">${hint}</span>` : ''}
  ${control}
  ${error ? `<span class="r-field__error" id="${id}-error">${icon('alert')}<span>${error}</span></span>` : ''}
</div>`;
};

export const SearchField = ({ label = 'Buscar series y pelis', placeholder = 'Buscá una serie o peli', value = '' }) =>
  `<form role="search" class="r-search" onsubmit="return false">
  ${icon('search')}
  <label class="r-sr-only" for="r-search">${label}</label>
  <input id="r-search" type="search" placeholder="${placeholder}" value="${value}" autocomplete="off">
  ${value ? IconButton({ iconName: 'close', label: 'Borrar búsqueda' }) : ''}
</form>`;
