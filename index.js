'use strict'

const XorShift = require('xorshift').constructor
const crypto = require('crypto')

module.exports = function prb (seed) {
  const xorshift = new XorShift(from(seed))

  return function randomBytes (n) {
    const buf = Buffer.allocUnsafe(n)

    let offset = 0

    while (offset < n) {
      let [ a, b ] = xorshift.randomint()
      let used = 0

      while (used < 4 && offset < n) {
        buf[offset++] = a // ECMAScript engines do `a % Math.pow(2, 8)` for us
        a = a >>> 8
        used++
      }

      while (used < 8 && offset < n) {
        buf[offset++] = b
        b = b >>> 8
        used++
      }
    }

    return buf
  }
}

// Make a seed for xorshift from a (short) string or buffer.
// TODO: move to a package, shared with pseudo-math-random
function from (seed) {
  let buf

  if (seed == null) {
    buf = crypto.randomBytes(16)
  } else if (!seed.length) {
    throw new RangeError('Seed length must be > 0')
  } else {
    buf = crypto.createHash('sha256').update(seed).digest()
  }

  return [
    buf.readUInt32BE(0),
    buf.readUInt32BE(4),
    buf.readUInt32BE(8),
    buf.readUInt32BE(12)
  ]
}
