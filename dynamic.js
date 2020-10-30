const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const configMap = new Map();
const { CONFIG_PATH = path.join(process.cwd(), 'config') } = process.env;

const removeExt = filename => filename.replace(/\.[^.]+$/, '');
const resolvePath = (configPath, filename) => path.resolve(`${configPath}/${filename}`);
const requireConfig = (filepath) => {
  delete require.cache[filepath];
  return fs.existsSync(filepath) ? require(filepath) : {};
};
const mergeConfig = () => {
  const { NODE_ENV = 'development', BUILD_PHASE = NODE_ENV } = process.env;
  const activePhases = ['default', ...BUILD_PHASE.split('/')];
  const activeConfigs = activePhases.map(phase => configMap.get(phase) || {});
  const mergedConfig = _.merge({}, ...activeConfigs);
  return mergedConfig;
};

// watch config changes
fs.watch(CONFIG_PATH, (eventType, filename) => {
  if (eventType === 'change', filename) {
    const phase = removeExt(filename);
    const filepath = resolvePath(CONFIG_PATH, filename);
    const config = requireConfig(filepath);
    configMap.set(phase, config);
  }
});

// load initial configs
fs.readdirSync(CONFIG_PATH)
  .map(filename => [removeExt(filename), resolvePath(CONFIG_PATH, filename)])
  .map(([phase, filepath]) => [phase, requireConfig(filepath)])
  .forEach(([phase, config]) => configMap.set(phase, config));

exports.get = path => _.get(mergeConfig(), path);
exports.has = path => _.has(mergeConfig(), path);
