const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const configs = new Map();
const configPath = process.env.CONFIG_PATH || path.join(process.cwd(), 'config');
const combinedConfig = _.memoize(function () {
  const { NODE_ENV = 'development', BUILD_PHASE = NODE_ENV } = process.env;
  const activePhases = ['default', ...BUILD_PHASE.split('/')];
  const activeConfigs = activePhases.map(key => configs.get(key) || {});

  return _.merge({}, ...activeConfigs);;
}, () => process.env.NODE_ENV + process.env.BUILD_PHASE);

function loadConfigFile (filename) {
  const phase = filename.replace(/\.[^.]+$/, '');
  const filepath = path.resolve(`${configPath}/${filename}`);
  configs.set(phase, fs.existsSync(filepath) ? require(filepath) : {});
}

// load initial configs
fs.readdirSync(configPath).map(loadConfigFile)

exports.get = path => _.get(combinedConfig(), path);
exports.has = path => _.has(combinedConfig(), path);
