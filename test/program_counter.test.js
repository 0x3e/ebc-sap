import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import {ProgramCounter} from "../src/program_counter.mjs"

describe("ProgramCounter", () => {
  it("count", () => {
    const pc = new ProgramCounter()
    pc.OUT = false
    pc.ENABLE = false
    pc.JUMP = h.nibbles.x0
    pc.CLK = true
    pc.CLK = false
    pc.CLK = true
    pc.CLK = false
    eq(
      pc.toString(),
      '{"type":"ProgramCounter","OUT":false,"JUMP":false,"ENABLE":false,"CLK":false,"Q":[false,false,false,false]}',
    )
    pc.ENABLE = true
    pc.CLK = true
    pc.CLK = false
    eq(
      pc.toString(),
      '{"type":"ProgramCounter","OUT":false,"JUMP":false,"ENABLE":true,"CLK":false,"Q":[true,false,false,false]}',
    )
    pc.CLK = true
    pc.CLK = false
    pc.CLK = true
    pc.CLK = false
    eq(
      pc.toString(),
      '{"type":"ProgramCounter","OUT":false,"JUMP":false,"ENABLE":true,"CLK":false,"Q":[true,true,false,false]}',
    )
    pc.ENABLE = false
    pc.JUMP = [true, false, true, false]
    pc.CLK = true
    pc.CLK = false
    pc.CLK = true
    pc.CLK = false

    eq(
      pc.toString(),
      '{"type":"ProgramCounter","OUT":false,"JUMP":false,"ENABLE":false,"CLK":false,"Q":[true,false,true,false]}',
    )
  })
})
