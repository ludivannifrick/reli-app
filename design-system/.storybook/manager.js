import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Reli · design system',
    brandImage: 'reli-icono.svg',
    brandTarget: '_self',
    colorPrimary: '#D7322F',
    colorSecondary: '#8E1F2B',
    appBg: '#FBF4E6',
    appContentBg: '#FFFDF7',
    appBorderColor: '#E6D5B8',
    textColor: '#3A2A22',
    textMutedColor: '#6B5649',
    barBg: '#FFFDF7',
    fontBase: "'Figtree', system-ui, sans-serif",
  }),
});
