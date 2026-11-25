export default {
  stories: ['../src/docs/**/*.mdx', '../src/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/html-vite',
  staticDirs: ['../public'],
  docs: { defaultName: 'Specs' },
  core: { disableTelemetry: true },
};
