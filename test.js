'use strict'

const test = require('tape')
const prb = require('.')

test('basic without seed', function (t) {
  t.plan(20 * 2)

  const randomBytes = prb()

  for (let i = 0; i < 20; i++) {
    const buf = randomBytes(i)
    t.ok(Buffer.isBuffer(buf))
    t.is(buf.length, i)
  }
})

test('throws if no length is provided', function (t) {
  const randomBytes = prb()

  t.throws(randomBytes)
  t.end()
})

test('with string seed', function (t) {
  t.plan(10)

  const randomBytes1 = prb('a seed')
  const randomBytes2 = prb('a seed')

  for (let i = 0; i < 10; i++) {
    t.same(randomBytes1(1024), randomBytes2(1024))
  }
})

test('with buffer seed', function (t) {
  t.plan(10)

  const randomBytes1 = prb(Buffer.from('a seed'))
  const randomBytes2 = prb(Buffer.from('a seed'))

  for (let i = 0; i < 10; i++) {
    t.same(randomBytes1(1024), randomBytes2(1024))
  }
})

test('string seed is treated equally to buffer seed', function (t) {
  t.plan(10)

  const randomBytes1 = prb('a seed')
  const randomBytes2 = prb(Buffer.from('a seed'))

  for (let i = 0; i < 10; i++) {
    t.same(randomBytes1(1024), randomBytes2(1024))
  }
})

test('with zero-filled seed', function (t) {
  const randomBytes = prb(Buffer.alloc(1))
  const results = new Set()

  for (let i = 0; i < 100; i++) {
    results.add(randomBytes(1)[0])
  }

  t.ok(results.size > 1, String(results.size))
  t.end()
})

test('no consecutive zeroes in all results', function (t) {
  const randomBytes = prb('a seed')
  const iterations = 1e6

  let occurences = 0

  for (let i = 0; i < iterations; i++) {
    const buf = randomBytes(16)

    for (let i = 0; i < buf.length - 1; i++) {
      if (buf[i] === 0 && buf[i + 1] === 0) {
        occurences++
        break
      }
    }
  }

  t.ok(occurences < iterations, String(occurences))
  t.end()
})
