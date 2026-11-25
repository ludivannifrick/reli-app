import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle:
      '<span style="display:flex;align-items:center;gap:10px;font-weight:700"><img src="reli-icono.svg" alt="" width="36" height="36" style="border-radius:10px">Reli design system</span>',
    brandTarget: '_self',
    colorPrimary: '#D7322F',
    colorSecondary: '#8E1F2B',
    appBg: '#FBF4E6',
    appContentBg: '#FFFDF7',
    appBorderColor: '#E6D5B8',
    textColor: '#3A2A22',
    textMutedColor: '#6B5649',
    barBg: '#FFFDF7',
    fontBase: "'Rubik', system-ui, sans-serif",
  }),
});
