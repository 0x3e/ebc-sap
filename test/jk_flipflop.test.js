import {describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import {JKFlipFlop} from "../src/jk_flipflop.mjs"

describe("JKFlipFlop", () => {
  it("JKFlipFlop", () => {
    /*                                       *\
    *   |   J   |   K   |   CLK  |    Q   |   *
    *   | (0,1) | (0,1) |  (0,1) |  (0,1) |   *
    *   |   0   |   0   |    1   |   last |   *
    *   |   0   |   1   |    1   |    0   |   *
    *   |   1   |   0   |    1   |    1   |   *
    *   |   1   |   1   |    0   | toggle |   *
    *   |   x   |   x   |    x   |    x   |   *
    \*                                       */
    const jKFF = new JKFlipFlop()

    jKFF.J = false
    jKFF.K = true
    jKFF.CLK = false
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.type, "JKFlipFlop")
    eq(
      jKFF.toString(),
      '{"type":"JKFlipFlop","J":false,"K":true,"CLK":false,"Q":false,"NOTQ":true}',
    )
    eq(typeof jKFF.Q, "boolean")
    jKFF.K = false
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, false)
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, false)
    jKFF.J = true
    eq(jKFF.Q, false)
    jKFF.J = false
    jKFF.K = false
    eq(jKFF.Q, false)
    jKFF.K = true
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, false)
    jKFF.K = false
    jKFF.J = true
    eq(jKFF.Q, false)
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, true)
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, true)
    jKFF.K = true
    jKFF.J = true
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, false)
    jKFF.CLK = true
    jKFF.CLK = false
    eq(jKFF.Q, true)
  })
})
