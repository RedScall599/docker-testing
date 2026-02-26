// Load Next's shareable config and export its `core-web-vitals` config for flat config
const nextConfig = require('eslint-config-next');

const coreWebVitals = nextConfig && nextConfig.configs && nextConfig.configs['core-web-vitals']
  ? nextConfig.configs['core-web-vitals']
  : nextConfig;

function flattenConfigs(item) {
  if (Array.isArray(item)) return item.flatMap(flattenConfigs);
  return [item];
}

module.exports = flattenConfigs(coreWebVitals);

