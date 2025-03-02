import {describe, eq, it, ok} from "../lib/test.mjs"
import {Clock} from "../src/clock.mjs"
import * as h from "../src/helpers.mjs"

describe("Clock", () => {
  it("ticks and tocks", () => {
    const c = new Clock()

    c.select = false
    c.manual_pulse = true
    c.HLT = false
    eq(c.output, true)
    c.manual_pulse = false
    eq(c.output, false)
  })
})
