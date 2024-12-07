import {test as describe} from "uvu"
import * as it from "uvu/assert"
import {DFlipFlop} from "../src/d_flipflop.js"
import * as h from "../src/helpers.js"

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
  dFF.CLK = true
  it.instance(dFF, DFlipFlop)
  it.is(dFF.type, "DFlipFlop")
  it.is(
    dFF.toString(),
    '{"type":"DFlipFlop","D":false,"CLK":false,"Q":false,"NOTQ":true}',
  )
  it.type(dFF.Q, "boolean")
  dFF.D = true
  dFF.CLK = true
  it.is(dFF.Q, true)
  dFF.CLK = false
  it.is(dFF.Q, true)
  dFF.D = false
  it.is(dFF.Q, true)
  dFF.D = true
  it.is(dFF.Q, true)
  dFF.D = false
  dFF.CLK = true
  it.is(dFF.Q, false)
  dFF.CLK = false
  it.is(dFF.Q, false)
  dFF.D = true
  it.is(dFF.Q, false)
  dFF.CLK = true
  it.is(dFF.Q, true)
  dFF.D = false
  dFF.CLK = true
  it.is(dFF.Q, false)
})
describe.run()
