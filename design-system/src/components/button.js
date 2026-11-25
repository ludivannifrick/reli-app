import { icon } from './icons.js';

export const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  loading = false,
  iconName,
  type = 'button',
}) => {
  const cls = ['r-button', `r-button--${variant}`, size === 'lg' && 'r-button--lg', full && 'r-button--full']
    .filter(Boolean)
    .join(' ');
  const lead = loading ? '<span class="r-spinner" aria-hidden="true"></span>' : iconName ? icon(iconName) : '';
  return `<button type="${type}" class="${cls}"${disabled ? ' disabled' : ''}${loading ? ' aria-busy="true"' : ''}>${lead}<span>${label}</span></button>`;
};

// Icon-only buttons always need an accessible name.
export const IconButton = ({ iconName, label, outlined = false }) =>
  `<button type="button" class="r-icon-button${outlined ? ' r-icon-button--outlined' : ''}" aria-label="${label}">${icon(iconName)}</button>`;
