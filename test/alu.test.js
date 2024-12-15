import {describe, eq, it, ok} from "../lib/test.mjs"
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
    eq(
      alu.toString(),
      '{"type":"ALU","A":[false,false,false,false,false,false,false,false],"B":[false,false,false,false,false,false,false,false],"SUM":[null,null,null,null,null,null,null,null],"SU":false,"EU":false}',
    )
    alu.EU = true
    eq(
      alu.SUM.toString(),
      [false, false, false, false, false, false, false, false].toString(),
    )
    alu.EU = false
    eq(
      alu.SUM.toString(),
      [null, null, null, null, null, null, null, null].toString(),
    )
  })
})
