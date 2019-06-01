'use strict'

const Benchmark = require('benchmark')
const prb = require('.')('a seed')
const rbs = require('random-bytes-seed')('a seed')
const suite = new Benchmark.Suite()
const n = parseInt(process.argv[2])

if (!Number.isInteger(n) || n < 1) {
  throw new Error('Provide an integer >= 1')
}

// Warmup (this call will not complete until node has enough entropy)
require('crypto').randomBytes(1)

console.log('node %s, n=%d\n', process.version, n)

suite
  .add('pseudo-random-bytes', function () {
    prb(n)
  })
  .add('random-bytes-seed', function () {
    rbs(n)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('\nFastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
