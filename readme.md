# `ow-my-class`

Validate a plain object with a class and make it type-safe!

[![Build Status](https://travis-ci.com/BoostIO/ow-my-class.svg?branch=master)](https://travis-ci.com/BoostIO/ow-my-class)
[![codecov](https://codecov.io/gh/BoostIO/ow-my-class/branch/master/graph/badge.svg)](https://codecov.io/gh/BoostIO/ow-my-class)
[![NPM download](https://img.shields.io/npm/dm/ow-my-class.svg)](https://www.npmjs.com/package/prismy)
[![Supported by BoostIO](https://github.com/BoostIO/boostio-materials/raw/master/v1/boostio-shield-v1.svg?sanitize=true)](https://boostio.co)

## Usage

```sh
npm i ow ow-my-class
```

```ts
import Omc from 'ow-my-class'
import ow from 'ow'

class User {
  @Omc(ow.string.minLength(5))
  name: string
}

// Return false
const result = Omc.isValid(
  {
    name: 'yolo'
  },
  User
)

// Throw ValidationError
Omc.validate(
  {
    name: 'yolo'
  },
  User
)

// Convert a plain object into a User instance
const user = Omc.transform(
  {
    name: 'yolo yolo'
  },
  User
)
```

## License

MIT
