// eslint.config.js
// Flat-config version of .eslintrc.cjs (no `extends`)
const tryRequire = (name) => {
  try {
    return require(name);
  } catch {
    return null;
  }
};

const reactPlugin = tryRequire('eslint-plugin-react');
const reactHooksPlugin = tryRequire('eslint-plugin-react-hooks');
const nodePlugin = tryRequire('eslint-plugin-node');
const nextConfigPkg = tryRequire('eslint-config-next');
const nextPlugin = tryRequire('@next/eslint-plugin-next');

// Attempt to pull Next's `core-web-vitals` config (may be an array or object)
let nextCore = null;
if (nextConfigPkg) {
  // prefer explicit export if available
  nextCore = nextConfigPkg.configs && nextConfigPkg.configs['core-web-vitals']
    ? nextConfigPkg.configs['core-web-vitals']
    : nextConfigPkg;
}

module.exports = [
  // If Next's config is available and is an array/object, include its items
  ...(nextCore
    ? (Array.isArray(nextCore) ? nextCore : [nextCore])
    : []),

  // Project-level flat config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    // Provide plugin objects so rules like react/ work in flat config
    plugins: {
      ...(reactPlugin ? { react: reactPlugin } : {}),
      ...(reactHooksPlugin ? { 'react-hooks': reactHooksPlugin } : {}),
      ...(nodePlugin ? { node: nodePlugin } : {}),
      ...(nextPlugin ? { '@next/eslint-plugin-next': nextPlugin } : {}),
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // keep project-specific overrides here; examples:
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];