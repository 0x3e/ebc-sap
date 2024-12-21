import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import * as Ram from "../src/rams.mjs"

describe("Rams", () => {
  it("one Bit", () => {
    const bit = new Ram.Bit()
    bit.WR = true
    bit.IN = true
    bit.EN = false
    eq(bit.toString(), '{"type":"Ram.Bit","WR":true,"EN":false,"IN":true}')
    bit.WR = false
    bit.IN = false
    bit.EN = true
    eq(
      bit.toString(),
      '{"type":"Ram.Bit","WR":false,"EN":true,"IN":false,"OUT":true}',
    )
  })
  it("EightBitWord", () => {
    const bits = new Ram.EightBitWord()
    bits.WR = true
    bits.IN = h.bytes.xFF
    bits.EN = false
    eq(
      bits.toString(),
      '{"type":"Ram.EightBitWord","WR":true,"EN":false,"IN":[true,true,true,true,true,true,true,true],"OUT":[null,null,null,null,null,null,null,null]}',
    )
    bits.WR = false
    bits.IN = h.bytes.x00
    bits.EN = true
    eq(
      bits.toString(),
      '{"type":"Ram.EightBitWord","WR":false,"EN":true,"IN":[false,false,false,false,false,false,false,false],"OUT":[true,true,true,true,true,true,true,true]}',
    )
  })
  it("FourBitAddressable", () => {
    const ram = new Ram.FourBitAddressable()
    ram.WR = true
    ram.ADDR = h.nibbles.x0
    ram.IN = h.bytes.xFF
    ram.EN = false
    eq(
      ram.toString(),
      '{"type":"Ram.FourBitAddressable","WR":true,"EN":false,"ADDR":[false,false,false,false],"IN":[true,true,true,true,true,true,true,true],"OUT":[null,null,null,null,null,null,null,null]}',
    )
    ram.WR = false
    ram.EN = true
    ram.IN = h.bytes.x00
    eq(
      ram.toString(),
      '{"type":"Ram.FourBitAddressable","WR":false,"EN":true,"ADDR":[false,false,false,false],"IN":[false,false,false,false,false,false,false,false],"OUT":[true,true,true,true,true,true,true,true]}',
    )
  })
})
