import {describe, eq, it, ok} from "../lib/test.mjs"
import {DFlipFlop} from "../src/d_flipflop.mjs"
import * as h from "../src/helpers.mjs"

describe("DFlipFlop", () => {
  /*                               *\
  *   |   D   |   CLK  |    Q   |   *
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
  const dFF = new DFlipFlop()

  dFF.D = false
  dFF.CLK = false
  dFF.CLK = true
  eq(dFF.type, "DFlipFlop")
  eq(
    dFF.toString(),
    '{"type":"DFlipFlop","D":false,"CLK":true,"Q":false,"NOTQ":true}',
  )
  eq(typeof dFF.Q, "boolean")
  dFF.D = true
  dFF.CLK = false
  dFF.CLK = true
  eq(dFF.Q, true)
  dFF.CLK = false
  dFF.CLK = true
  eq(dFF.Q, true)
  dFF.D = false
  eq(dFF.Q, true)
  dFF.D = true
  eq(dFF.Q, true)
  dFF.D = false
  dFF.CLK = false
  dFF.CLK = true
  eq(dFF.Q, false)
  dFF.CLK = false
  eq(dFF.Q, false)
  dFF.D = true
  eq(dFF.Q, false)
  dFF.CLK = true
  eq(dFF.Q, true)
  dFF.D = false
  dFF.CLK = false
  dFF.CLK = true
  eq(dFF.Q, false)
})
