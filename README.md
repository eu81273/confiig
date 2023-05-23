# confiig

Super simple config loader.
`confiig` loads configuration based on `NODE_ENV` environment variable.  
<br/><br/>

## Getting Started
```bash
$ npm install confiig
```
<br/>

## Usage
Basically, configuration loads from `./config` directory.  
You can set `CONFIG_PATH` environment variable to change default config path.  
`confiig` tries to load config file that named like `BUILD_PHASE or NODE_ENV` + '.js'.  

```
├── config
│   ├── cbt.js
│   ├── default.js
│   ├── development.js
│   ├── local.js
│   ├── production.js
│   └── sandbox.js
```

```js
const conf = require('confiig');

console.log(conf.read('foo.bar'));
```


### Default config
If 'default.js' config file exists in config path then configuration consisted based on the 'default' file and merged `NODE_ENV` configs into default one.  

### Multiple Configs
Multiple configs can be merged with separator.
For example, set `NODE_ENV` with separator `/` like `local/foo` then `default.js + local.js + foo.js` configs are merged.  

### Dynamic NODE_ENV
If the `NODE_ENV` or `BUILD_PHASE` environment variable changes, it will automatically reread and merge the config files and return the path values when you call the read method. If no changes that environment variable, then it memoization that merged configs.

```js
const conf = require('confiig');

process.env.NODE_ENV = 'development';
console.log(conf.read('foo.bar')); // development config value

process.env.NODE_ENV = 'sandbox';
console.log(conf.read('foo.bar')); // sandbox config value
```
<br/><br/>

## API

```
.read(path, [defaultValue])
```

`path (string)`: The path of the property to get.  
`defaultValue (any)`: The value returned for undefined resolved values. Optional.  
`returns (any)`: the value in the config if found, otherwise it returns undefined.
<br/><br/>

## License

May be freely distributed under the [MIT license](https://github.com/eu81273/confiig/blob/master/LICENSE).

Copyright (c) 2021-2023 eu81273
