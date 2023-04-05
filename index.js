const path = require('path');
const get = require('lodash/get');
const merge = require('lodash/merge');
const memoize = require('lodash/memoize');

const DEFAULT_PHASE = 'development';
const uncachedRequire = (phase) => {
  try {
    const configPath = path.resolve(process.env.CONFIG_PATH || path.join(process.cwd(), 'config'), phase);
    delete require.cache[configPath];
    return require(configPath);
  } catch (e) {
    return {};
  }
}
const mergedConfig = memoize(function () {
  const { NODE_ENV = DEFAULT_PHASE, BUILD_PHASE = NODE_ENV } = process.env;
  return merge({}, ...['default', ...BUILD_PHASE.split('/')].map(uncachedRequire));
}, () => process.env.NODE_ENV + process.env.BUILD_PHASE);

/**
  * Gets the property value at path of merged config.
 * @param {string} path The path of the property to get.
 * @param {*} defaultValue The value returned if the resolved value is undefined.
 * @returns 
 */
function read (path, defaultValue) {
  return get(mergedConfig(), path, defaultValue);
};

exports.read = read;
