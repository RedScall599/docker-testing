// eslint.config.js
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  // Convert legacy "extends: next/core-web-vitals" into flat config objects
  ...compat.extends("next/core-web-vitals"),

  // Optional: your project overrides
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // add overrides here if needed
    },
  },
];