# Env file docker

[![Build Status](https://travis-ci.org/LiamMartens/env-file-docker.svg?branch=master)](https://travis-ci.org/LiamMartens/env-file-docker) [![Coverage Status](https://coveralls.io/repos/github/LiamMartens/env-file-docker/badge.svg?branch=master)](https://coveralls.io/github/LiamMartens/env-file-docker?branch=master) [![devDependencies Status](https://david-dm.org/LiamMartens/env-file-docker/dev-status.svg)](https://david-dm.org/LiamMartens/env-file-docker?type=dev)

This is a utility package to extract environment variables in `Node.js`, taking into account the possibility for `ENV_FILE` type variables as is used a lot in `Docker` containers.

## Configuration
By default the `_FILE` variant will be preferred. This means if a file is set, it will try to load it before falling back on the environment variable as is. This behavior can be altered by setting the `PreferType` as shown below.
```javascript
const envFile = require('env-file-docker');

envFile.setPreferType(envFile.PreferTypes.ENV); // the PreferType is envFile.PreferTypes.FILE by default

process.env.HELLO_FILE = '/some/file';
process.env.HELLO = 'world';
console.log(envFile('HELLO', 'default'));
// output will be world, since the environment variable as is is now preferred

```

## Usage
```javascript
const envFile = require('env-file-docker');

console.log(envFile('HELLO', 'default'));
// output 'default'

process.env.HELLO_FILE = '/some/file';
console.log(envFile('HELLO', 'default'));
// output is the content of '/some/file'

process.env.HELLO = 'world';
console.log(envFile('HELLO', 'default'));
// output 'world'
```