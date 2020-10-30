# confiig

Super simple config library for node.js application.  
confiig loads configuration based on `NODE_ENV` environment variable.  
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
import conf from 'confiig';

console.log(conf.get('foo.bar'));
```


### Default config
If 'default.js' file exists in config path then configuration consisted based on the 'default' file and merged `NODE_ENV` configs into default one.  

### Multiple Configs
Multiple configs can be merged with separator.
For example, set `NODE_ENV` with separator `/` like `local/foo` then `default.js + local.js + foo.js` configs are merged.  

### Dynamic Configuration
With `confiig/dynamic` module, you can get values latest. `confiig/dynamic` module watchs change of NODE_ENV and config files.
If config files or NODE_ENV changes then the returning value changes according to.

```js
import conf from 'confiig/dynamic';

process.env.NODE_ENV = 'development';
console.log(conf.get('foo.bar')); // development config value

process.env.NODE_ENV = 'sandbox';
console.log(conf.get('foo.bar')); // sandbox config value
```
<br/><br/>

## API

```
.get(path, [defaultValue])
```

`path (string)`: The path of the property to get.  
`defaultValue (any)`: The value returned for undefined resolved values. Optional.  
`returns (any)`: the value in the config if found, otherwise it returns undefined.  
<br/>
```
.has(path)
```

`path (string)`: The path to check.  
`returns (boolean)`: true if the path exists false if it does not.  

