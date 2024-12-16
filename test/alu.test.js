import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import {ALU} from "../src/alu.mjs"
import * as h from "../src/helpers.mjs"

describe("ALU", () => {
  it("ALU", () => {
    const alu = new ALU()
    alu.A = h.bytes.x00
    alu.B = h.bytes.x00
    alu.SU = false
    alu.EU = false
    eq(alu.type, "ALU")
    dEq(alu.toJSON(), {
      type: "ALU",
      A: h.bytes.x00,
      B: h.bytes.x00,
      SUM: h.bytes.xZZ,
      SU: false,
      EU: false,
    })
    alu.EU = true
    dEq(alu.SUM, [false, false, false, false, false, false, false, false])
    alu.EU = false
    dEq(alu.SUM, h.bytes.xZZ)
  })
})
