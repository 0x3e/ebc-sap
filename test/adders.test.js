import {describe, eq, it, ok} from "../lib/test.mjs"
import {EightBitAdder, FullAdder, HalfAdder} from "../src/adders.mjs"
import * as h from "../src/helpers.mjs"

describe("Adders", () => {
  it("HalfAdder", () => {
    const half_adder = new HalfAdder()

    half_adder.A = false
    half_adder.B = false
    eq(half_adder.type, "HalfAdder")
    eq(
      half_adder.toString(),
      '{"type":"HalfAdder","A":false,"B":false,"SUM":false,"CARRY":false}',
    )
    half_adder.A = true
    eq(half_adder.SUM, true)
    eq(half_adder.CARRY, false)
    half_adder.B = true
    eq(half_adder.SUM, false)
    eq(half_adder.CARRY, true)
    half_adder.A = false
    eq(half_adder.SUM, true)
    eq(half_adder.CARRY, false)
    half_adder.B = false
    eq(half_adder.SUM, false)
    eq(half_adder.CARRY, false)
  })
  it("FullAdder", () => {
    const full_adder = new FullAdder()

    full_adder.A = false
    full_adder.B = false
    full_adder.C = false
    eq(full_adder.type, "FullAdder")
    eq(
      full_adder.toString(),
      '{"type":"FullAdder","A":false,"B":false,"C":false,"SUM":false,"CARRY":false}',
    )
    full_adder.A = true
    eq(full_adder.SUM, true)
    eq(full_adder.CARRY, false)
    full_adder.B = true
    eq(full_adder.SUM, false)
    eq(full_adder.CARRY, true)
    full_adder.A = false
    eq(full_adder.SUM, true)
    eq(full_adder.CARRY, false)
    full_adder.B = false
    eq(full_adder.SUM, false)
    eq(full_adder.CARRY, false)
    full_adder.A = true
    full_adder.B = true
    full_adder.C = true
    eq(full_adder.SUM, true)
    eq(full_adder.CARRY, true)
  })
  it("EightBitAdder", () => {
    const eight_bit_adder = new EightBitAdder()

    eight_bit_adder.A = h.bytes.x00
    eight_bit_adder.B = h.bytes.x00
    eight_bit_adder.C = false
    eq(eight_bit_adder.type, "EightBitAdder")
    eq(
      eight_bit_adder.toString(),
      '{"type":"EightBitAdder","A":[false,false,false,false,false,false,false,false],"B":[false,false,false,false,false,false,false,false],"C":false,"SUM":[false,false,false,false,false,false,false,false],"CARRY":false}',
    )
    eight_bit_adder.A = h.bytes.x01
    eight_bit_adder.B = h.bytes.x00
    eight_bit_adder.C = false
    eq(
      eight_bit_adder.toString(),
      '{"type":"EightBitAdder","A":[true,false,false,false,false,false,false,false],"B":[false,false,false,false,false,false,false,false],"C":false,"SUM":[true,false,false,false,false,false,false,false],"CARRY":false}',
    )
    eight_bit_adder.A = h.bytes.x01
    eight_bit_adder.B = h.bytes.x01
    eq(
      eight_bit_adder.toString(),
      '{"type":"EightBitAdder","A":[true,false,false,false,false,false,false,false],"B":[true,false,false,false,false,false,false,false],"C":false,"SUM":[false,true,false,false,false,false,false,false],"CARRY":false}',
    )
    eq(
      eight_bit_adder.SUM.toString(),
      [false, true, false, false, false, false, false, false].toString(),
    )
  })
})
