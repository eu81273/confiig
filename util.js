exports.safeRequire = function (module) {
  try {
    delete require.cache[require.resolve(module)];
    return require(module);
  } catch (_) {
    return {};
  }
};
