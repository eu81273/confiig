const test = require('ava');

test('tests a successful production configuration retrieval', t => {
  process.env.CONFIG_PATH = './config';
  process.env.NODE_ENV = 'production';
  const conf = require('./');

  t.is(conf.read('env'), 'production');
  t.is(conf.read('foo.bar'), 'bar');
  t.is(conf.read('not.exists'), undefined);
  t.is(conf.read('foo.baz'), 'baz-production');
  t.is(conf.read('foo.qux'), 'qux-production');
  t.is(conf.read('quuz.corge'), 'corge');
  t.is(conf.read('waldo.fred'), 'fred');
});

test('tests a successful development configuration retrieval', t => {
  process.env.CONFIG_PATH = './config';
  process.env.NODE_ENV = 'development';
  const conf = require('./');

  t.is(conf.read('env'), 'development');
  t.is(conf.read('foo.bar'), 'bar');
  t.is(conf.read('not.exists'), undefined);
  t.is(conf.read('foo.baz'), 'baz-development');
  t.is(conf.read('foo.qux'), 'qux-development');
  t.is(conf.read('quuz.corge'), 'corge');
  t.is(conf.read('grault.garply'), 'garply');
});

test('tests a successful multiple configuration retrieval', t => {
  process.env.CONFIG_PATH = './config';
  process.env.NODE_ENV = 'development/local';
  const conf = require('./');

  t.is(conf.read('env'), 'local');
  t.is(conf.read('foo.bar'), 'bar');
  t.is(conf.read('not.exists'), undefined);
  t.is(conf.read('foo.baz'), 'baz-local');
  t.is(conf.read('foo.qux'), 'qux-local');
  t.is(conf.read('quuz.corge'), 'corge');
  t.is(conf.read('grault.garply'), 'garply');
});

test('tests a successful fallback configuration retrieval', t => {
  process.env.CONFIG_PATH = './config';
  process.env.NODE_ENV = 'another';
  const conf = require('./');

  t.is(conf.read('env'), 'default');
  t.is(conf.read('foo.bar'), 'bar');
  t.is(conf.read('not.exists'), undefined);
  t.is(conf.read('foo.baz'), 'baz');
  t.is(conf.read('foo.qux'), undefined);
  t.is(conf.read('quuz.corge'), 'corge');
  t.is(conf.read('grault.garply'), undefined);
});

test('tests a successful configuration retrieval according to NODE_ENV', t => {
  process.env.CONFIG_PATH = './config';
  process.env.NODE_ENV = 'production';
  const conf = require('./');

  t.is(conf.read('env'), 'production');
  t.is(conf.read('refer'), 'refer production');
  t.is(conf.read('foo.bar'), 'bar');
  t.is(conf.read('not.exists'), undefined);
  t.is(conf.read('foo.baz'), 'baz-production');
  t.is(conf.read('foo.qux'), 'qux-production');
  t.is(conf.read('quuz.corge'), 'corge');
  t.is(conf.read('waldo.fred'), 'fred');

  process.env.NODE_ENV = 'development';
  t.is(conf.read('env'), 'development');
  t.is(conf.read('refer'), 'refer development');
  t.is(conf.read('foo.bar'), 'bar');
  t.is(conf.read('not.exists'), undefined);
  t.is(conf.read('foo.baz'), 'baz-development');
  t.is(conf.read('foo.qux'), 'qux-development');
  t.is(conf.read('quuz.corge'), 'corge');
  t.is(conf.read('grault.garply'), 'garply');
});
