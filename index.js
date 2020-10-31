const fs = require('fs');
const path = require('path');
const memoize = require('lodash/memoize');
const merge = require('lodash/merge');
const get = require('lodash/get');
const has = require('lodash/has');
const util = require('./util');

const configs = new Map();
const configPath = process.env.CONFIG_PATH || path.join(process.cwd(), 'config');
const combinedConfig = memoize(function () {
  const { NODE_ENV = 'development', BUILD_PHASE = NODE_ENV } = process.env;
  const activePhases = ['default', ...BUILD_PHASE.split('/')];
  const activeConfigs = activePhases.map(key => configs.get(key) || {});

  return merge({}, ...activeConfigs);;
}, () => process.env.NODE_ENV + process.env.BUILD_PHASE);

function loadConfigFile (filename) {
  const phase = filename.replace(/\.[^.]+$/, '');
  const filepath = path.resolve(`${configPath}/${filename}`);
  configs.set(phase, util.safeRequire(filepath));
}

// load initial configs
fs.readdirSync(configPath).map(loadConfigFile)

exports.get = path => get(combinedConfig(), path);
exports.has = path => has(combinedConfig(), path);
