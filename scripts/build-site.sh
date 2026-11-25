#!/bin/sh
# Builds the Vercel output: the static app at / and the design system Storybook at /design-system/.
set -e
rm -rf site
mkdir -p site
cp index.html app.js data.js styles.css site/
cd design-system
npm run build-storybook -- --quiet --output-dir ../site/design-system
