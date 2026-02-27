// Load Next's shareable config and export its `core-web-vitals` config for flat config
const nextConfig = require('eslint-config-next');

const coreWebVitals = nextConfig && nextConfig.configs && nextConfig.configs['core-web-vitals']
  ? nextConfig.configs['core-web-vitals']
  : nextConfig;

// Ensure the `node` plugin is present on the resolved config so rules like
// `node/no-extraneous-import` are recognized when ESLint runs.
function ensureNodePlugin(item) {
  if (Array.isArray(item)) {
    item.forEach(cfg => {
      if (cfg && typeof cfg === 'object') cfg.plugins = Array.from(new Set([...(cfg.plugins || []), 'node']))
    })
  } else if (item && typeof item === 'object') {
    item.plugins = Array.from(new Set([...(item.plugins || []), 'node']))
  }
}

ensureNodePlugin(coreWebVitals)

function flattenConfigs(item) {
  if (Array.isArray(item)) return item.flatMap(flattenConfigs);
  return [item];
}

module.exports = flattenConfigs(coreWebVitals);

