module.exports = {
  env: 'production',
  refer: `refer ${process.env.NODE_ENV}`,
  foo: {
    baz: 'baz-production',
    qux: 'qux-production',
  },
  waldo: {
    fred: 'fred',
  }
};
