const assert = require("assert")

const assertTrue = (value, message) => assert.ok(value, message)

module.exports = {
    assertTrue,
    assertGreaterThan: (actual, expected) => assertTrue(actual > expected, `Expected ${actual} > ${expected}`),
    assertLessThan: (actual, expected) => assertTrue(actual < expected, `Expected ${actual} < ${expected}`),
    assertBetween: (actual, min, max) => assertTrue(actual >= min && actual <= max, `Expected ${min} <= ${actual} <= ${max}`),
    assertEqual: assert.equal
}