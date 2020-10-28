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
`confiig` loads config file based on `BUILD_PHASE` or `NODE_ENV` environment variable.

```
├── config
│   ├── cbt.js
│   ├── default.js
│   ├── development.js
│   ├── production.js
│   └── sandbox.js
```

```js
import conf from 'confiig';

console.log(conf.get('foo.bar'));
```
<br/>

## API

```
.get(path, [defaultValue])`
```

path (string): The path of the property to get.  
[defaultValue] (*): The value returned for undefined resolved values.  
returns (*): the value in the config if found, otherwise it returns undefined.  
<br/>
```
.has(path)
```
path (string): The path to check.  
returns (boolean): true if the path exists false if it does not.  

