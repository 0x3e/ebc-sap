import {describe, eq, it, ok} from "../lib/test.mjs"
import {RegisterDisplay} from "../src/display/register.mjs"
import * as h from "../src/helpers.mjs"
import {MultiBitRegister} from "../src/registers.mjs"

describe("RegisterDisplay", () => {
  it("txt display", () => {
    const rd = new RegisterDisplay()
    rd.D = h.nibbles.x1
    eq(rd.txt(), "○ ○ ○ ●")
    const r = new MultiBitRegister(4)
    rd.register = r
    r.LOAD = true
    r.OUT = true
    r.D = h.nibbles.x0
    r.CLK = false
    r.CLK = true
    r.CLK = false
    eq(rd.txt(), "○ ○ ○ ○")
    r.LOAD = false
    r.OUT = false
    r.D = h.nibbles.xF
    r.CLK = false
    r.CLK = true
    r.CLK = false
    eq(rd.txt(), "○ ○ ○ ○")
    r.LOAD = true
    r.CLK = false
    r.CLK = true
    r.CLK = false
    eq(rd.txt(), "● ● ● ●")
    r.D = h.nibbles.x1
    r.CLK = false
    r.CLK = true
    r.CLK = false
    eq(rd.txt(), "○ ○ ○ ●")
  })
})
