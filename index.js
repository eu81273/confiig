const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const {
  NODE_ENV = 'development',
  BUILD_PHASE = NODE_ENV,
  CONFIG_PATH = path.join(process.cwd(), 'config'),
} = process.env;

const envConfigPath = path.resolve(`${CONFIG_PATH}/${BUILD_PHASE}.js`);
const defaultConfigPath = path.resolve(`${CONFIG_PATH}/default.js`);
const envConfig = fs.existsSync(envConfigPath) ? require(envConfigPath) : {};
const defaultConfig = fs.existsSync(defaultConfigPath) ? require(defaultConfigPath) : {};
const mergedConfig = _.merge({}, defaultConfig, envConfig);

exports.get = path => _.get(mergedConfig, path);
exports.has = path => _.has(mergedConfig, path);
