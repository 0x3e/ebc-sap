import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import {ProgramCounter} from "../src/program_counter.mjs"

describe("ProgramCounter", () => {
  it("count", () => {
    const pc = new ProgramCounter()
    pc.OUT = false
    pc.ENABLE = false
    pc.JUMP = h.nibbles.x0
    pc.CLK = false
    pc.CLK = true

    eq(
      pc.toString(),
      '{"type":"ProgramCounter","OUT":false,"ENABLE":true,"CLK":false,"Q":[false,false,true,false]}',
    )
  })
})
