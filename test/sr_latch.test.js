import {describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.js"
import {SRLatch} from "../src/sr_latch.js"

describe("SRLatch", () => {
  it("is", () => {
    /*                               *\
  *   |   S   |    R   |    Q   |   *
  *   | (0,1) |  (0,1) |  (0,1) |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    0   |    1   |   *
  *   |   0   |    1   |    0   |   *
  *   |   0   |    0   |    0   |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    0   |    1   |   *
  *   |   0   |    1   |    0   |   *
  *   |   0   |    0   |    0   |   *
  \*                               */
    const sR = new SRLatch()

    sR.S = false
    sR.R = false
    eq(sR.type, "SRLatch")
    eq(
      sR.toString(),
      '{"type":"SRLatch","S":false,"R":false,"Q":false,"NOTQ":true}',
    )
    eq(typeof sR.Q, "boolean")
    sR.S = true
    eq(sR.Q, true)
    sR.S = false
    eq(sR.Q, true)
    sR.R = true
    eq(sR.Q, false)
    sR.R = false
    eq(sR.Q, false)
    sR.S = true
    eq(sR.Q, true)
    sR.S = false
    eq(sR.Q, true)
    sR.R = true
    eq(sR.Q, false)
    sR.R = false
    eq(sR.Q, false)
  })
})
