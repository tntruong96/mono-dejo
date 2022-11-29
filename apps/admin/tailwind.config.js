const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    xs: { max: '575px' },

    sm: { min: '576px', max: '767px' },

    md: { min: '768px', max: '991px' },

    lg: { min: '992px', max: '1199px' },

    xl: { min: '1200px' }
}
};
