# pseudo-random-bytes

> **Get a random buffer based on a seed. Fast, not secure.**  
> Useful for reproducible tests and benchmarks. Same API as [`random-bytes-seed`](https://github.com/mafintosh/random-bytes-seed) which uses [`crypto`](https://nodejs.org/api/crypto.html) (secure) while this uses [xorshift128+](https://github.com/AndreasMadsen/xorshift) (10-25x faster). See also [`pseudo-math-random`](https://github.com/vweevers/pseudo-math-random).

[![npm status](http://img.shields.io/npm/v/pseudo-random-bytes.svg)](https://www.npmjs.org/package/pseudo-random-bytes)
[![node](https://img.shields.io/node/v/pseudo-random-bytes.svg)](https://www.npmjs.org/package/pseudo-random-bytes)
[![Travis build status](https://img.shields.io/travis/vweevers/pseudo-random-bytes.svg?label=travis)](http://travis-ci.org/vweevers/pseudo-random-bytes)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const prb = require('pseudo-random-bytes')
const randomBytes = prb('a seed')

console.log(randomBytes(4)) // <Buffer a3 e5 40 54>
console.log(randomBytes(3)) // <Buffer 09 14 6b>
```

This example will always log the same bytes, unless you change the seed.

## API

### `randomBytes = prb([seed])`

Create a new random bytes generator. The `seed` argument must be a string or [Buffer](https://nodejs.org/api/buffer.html). It is hashed once to counter short or zero-filled seeds. If no seed is provided one will be generated.

### `buf = randomBytes(length)`

Get a buffer with pseudo random bytes.

## Install

With [npm](https://npmjs.org) do:

```
npm install pseudo-random-bytes
```

## Benchmark

```
$ node benchmark.js 1024
node v10.14.1, n=1024

pseudo-random-bytes x 166,796 ops/sec ±1.68% (86 runs sampled)
random-bytes-seed x 13,477 ops/sec ±2.08% (76 runs sampled)

Fastest is pseudo-random-bytes
```

_NB. Speed isn't everything. Decide for yourself which properties you need._

## License

[MIT](LICENSE.md) © 2019-present Vincent Weevers
