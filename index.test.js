describe('🚚 confiig tests', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env['CONFIG_PATH'];
    delete process.env['BUILD_PHASE'];
    delete process.env['NODE_ENV'];
  });

  it('tests a successful production configuration retrival', () => {
    process.env['CONFIG_PATH'] = './config';
    process.env['NODE_ENV'] = 'production';
    const conf = require('./index.js');

    expect(conf.get('env')).toBe('production');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz-production');
    expect(conf.get('foo.qux')).toBe('qux-production');
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('waldo.fred')).toBe('fred');
  });

  it('tests a successful development configuration retrival', () => {
    process.env['CONFIG_PATH'] = './config';
    process.env['NODE_ENV'] = 'development';
    const conf = require('./index.js');

    expect(conf.get('env')).toBe('development');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz-development');
    expect(conf.get('foo.qux')).toBe('qux-development');
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('grault.garply')).toBe('garply');
  });

  it('tests a successful multiple configuration retrival', () => {
    process.env['CONFIG_PATH'] = './config';
    process.env['NODE_ENV'] = 'development/local';
    const conf = require('./index.js');

    expect(conf.get('env')).toBe('local');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz-local');
    expect(conf.get('foo.qux')).toBe('qux-local');
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('grault.garply')).toBe('garply');
  });

  it('tests a successful fallback configuration retrival', () => {
    process.env['CONFIG_PATH'] = './config';
    process.env['NODE_ENV'] = 'another';
    const conf = require('./index.js');

    expect(conf.get('env')).toBe('default');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz');
    expect(conf.get('foo.qux')).toBe(undefined);
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('grault.garply')).toBe(undefined);
  });

  it('tests a successful dynamic configuration retrival', () => {
    process.env['CONFIG_PATH'] = './config';
    process.env['NODE_ENV'] = 'production';
    const conf = require('./dynamic.js');

    expect(conf.get('env')).toBe('production');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz-production');
    expect(conf.get('foo.qux')).toBe('qux-production');
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('waldo.fred')).toBe('fred');

    process.env['NODE_ENV'] = 'development';
    expect(conf.get('env')).toBe('development');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz-development');
    expect(conf.get('foo.qux')).toBe('qux-development');
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('grault.garply')).toBe('garply');

    process.env['NODE_ENV'] = 'development/local';
    expect(conf.get('env')).toBe('local');
    expect(conf.get('foo.bar')).toBe('bar');
    expect(conf.get('not.exists')).toBe(undefined);
    expect(conf.get('foo.baz')).toBe('baz-local');
    expect(conf.get('foo.qux')).toBe('qux-local');
    expect(conf.get('quuz.corge')).toBe('corge');
    expect(conf.get('grault.garply')).toBe('garply');

    conf.watcher.close(); // stop watching config files.
  });
});
