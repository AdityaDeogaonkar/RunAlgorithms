const path = require('path');

module.exports = function override(config) {
  // Fix Excalidraw's roughjs ESM module resolution issue with CRA5/webpack5
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
