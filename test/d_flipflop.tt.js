import {DFlipFlop} from "../src/d_flipflop.js"
import * as h from "../src/helpers.js"
import {describe, it} from "./ttester.js"

//biome-ignore format: text alignment
describe("DFlipFlop", () => {
  const dFF = new DFlipFlop()

  dFF.D = false
  dFF.CLK = true
  it.matches("is a DFlipFlop", () => dFF.type, "DFlipFlop")
  it.output(dFF.toString())
  it.output( ".    |   D   |   CLK  |    Q   |")
  it.matches(".    | (0,1) |  (0,1) |  (0,1) |", () => typeof dFF.Q, "boolean")
  dFF.D = true
  dFF.CLK = true
  it.isTrue( ".    |   1   |    1   |    1   |", () => dFF.Q)
  dFF.CLK = false
  it.isTrue( ".    |   1   |    0   |    1   |", () => dFF.Q)
  dFF.D = false
  it.isTrue( ".    |   0   |    0   |    1   |", () => dFF.Q)
  dFF.D = true
  it.isTrue( ".    |   1   |    0   |    1   |", () => dFF.Q)
  dFF.D = false
  dFF.CLK = true
  it.isFalse(".    |   0   |    1   |    0   |", () => dFF.Q)
  dFF.CLK = false
  it.isFalse(".    |   0   |    0   |    0   |", () => dFF.Q)
  dFF.D = true
  it.isFalse(".    |   1   |    0   |    0   |", () => dFF.Q)
  dFF.CLK = true
  it.isTrue( ".    |   1   |    1   |    1   |", () => dFF.Q)
  dFF.D = false
  dFF.CLK = true
  it.isFalse(".    |   0   |    0   |    0   |", () => dFF.Q)
})
