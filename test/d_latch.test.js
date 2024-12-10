import {describe, eq, it, ok} from "../lib/test.mjs"
import {DLatch} from "../src/d_latch.js"
import * as h from "../src/helpers.js"

describe("DLatch", () => {
  it("DLatch", () => {
    /*                               *\
  *   |   D   |   EN   |    Q   |   *
  *   | (0,1) |  (0,1) |  (0,1) |   *
  *   |   1   |    1   |    1   |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    0   |    1   |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    1   |    0   |   *
  *   |   0   |    0   |    0   |   *
  *   |   1   |    0   |    0   |   *
  *   |   1   |    1   |    1   |   *
  *   |   0   |    0   |    0   |   *
  \*                               */
    const dL = new DLatch()

    dL.D = false
    dL.EN = true
    eq(dL.type, "DLatch")
    eq(
      dL.toString(),
      '{"type":"DLatch","D":false,"EN":true,"Q":false,"NOTQ":true}',
    )
    eq(typeof dL.Q, "boolean")
    dL.D = true
    eq(dL.Q, true)
    dL.EN = false
    eq(dL.Q, true)
    dL.D = false
    eq(dL.Q, true)
    dL.D = true
    eq(dL.Q, true)
    dL.D = false
    dL.EN = true
    eq(dL.Q, false)
    dL.EN = false
    eq(dL.Q, false)
    dL.D = true
    eq(dL.Q, false)
    dL.EN = true
    eq(dL.Q, true)
    dL.D = false
    dL.EN = false
    eq(dL.Q, false)
  })
})
