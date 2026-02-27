// Load Next's shareable config and export its `core-web-vitals` config for flat config
const nextConfig = require('eslint-config-next');

const coreWebVitals = nextConfig && nextConfig.configs && nextConfig.configs['core-web-vitals']
  ? nextConfig.configs['core-web-vitals']
  : nextConfig;

// Ensure the `node` plugin is present on the resolved config so rules like
// `node/no-extraneous-import` are recognized when ESLint runs.
function ensureNodePlugin(item) {
  function addNode(cfg) {
    if (!cfg || typeof cfg !== 'object') return
    // Normalize plugins to an array in a safe way. `cfg.plugins` may be
    // undefined, a string, an array, or another non-iterable value from the
    // resolved Next config. Coerce to array then dedupe.
    const existing = Array.isArray(cfg.plugins)
      ? cfg.plugins
      : (cfg.plugins == null ? [] : [cfg.plugins])
    cfg.plugins = Array.from(new Set([...existing, 'node']))
  }

  if (Array.isArray(item)) {
    item.forEach(addNode)
  } else {
    addNode(item)
  }
}

ensureNodePlugin(coreWebVitals)

function flattenConfigs(item) {
  if (Array.isArray(item)) return item.flatMap(flattenConfigs);
  return [item];
}

module.exports = flattenConfigs(coreWebVitals);

