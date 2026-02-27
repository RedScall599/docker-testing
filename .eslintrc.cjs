module.exports = {
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      rules: {
        // project-specific rule overrides
      },
    },
  ],
};
