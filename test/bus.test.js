import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import {Bus} from "../src/bus.mjs"
import * as h from "../src/helpers.mjs"

describe("Bus", () => {
  it("Bus", () => {
    const bus = new Bus()

    dEq(bus.io(h.bytes.xZZ), h.bytes.xZZ)
    dEq(bus.io(h.bytes.xNN), h.bytes.xZZ)
    dEq(bus.io(h.bytes.x00), h.bytes.x00)
    dEq(bus.io(h.bytes.xZZ), h.bytes.x00)
    dEq(bus.io(h.bytes.xFF), h.bytes.xFF)
    dEq(bus.io(h.bytes.xZZ), h.bytes.xFF)
  })
})
