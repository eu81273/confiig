const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const {
  NODE_ENV = 'development',
  BUILD_PHASE = NODE_ENV,
  CONFIG_PATH = path.join(process.cwd(), 'config'),
} = process.env;

const defaultConfigPath = path.resolve(`${CONFIG_PATH}/default.js`);
const defaultConfig = fs.existsSync(defaultConfigPath) ? require(defaultConfigPath) : {};
const envConfigs = BUILD_PHASE
  .split('/')
  .map(phase => path.resolve(`${CONFIG_PATH}/${phase}.js`))
  .map(envConfigPath => fs.existsSync(envConfigPath) ? require(envConfigPath) : {});
const mergedConfig = _.merge({}, defaultConfig, ...envConfigs);

exports.get = path => _.get(mergedConfig, path);
exports.has = path => _.has(mergedConfig, path);
