import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import {MultiBitRegister, Register} from "../src/registers.mjs"

describe("Registers", () => {
  it("one Register", () => {
    /*                                                 *\
    *   |   D   |  LOAD  |   OUT  |  CLK   |    Q   |   *
    *   | (0,1) |  (0,1) |  (0,1) |  (0,1) |  (0,1) |   *
    *   |   1   |    1   |    1   |    ?   |    ?   |   *
    *   |   1   |    0   |    1   |    ?   |    ?   |   *
    *   |   0   |    0   |    1   |    ?   |    ?   |   *
    *   |   1   |    0   |    1   |    ?   |    ?   |   *
    *   |   0   |    1   |    0   |    ?   |    ?   |   *
    *   |   0   |    0   |    0   |    ?   |    ?   |   *
    *   |   1   |    0   |    0   |    ?   |    ?   |   *
    *   |   1   |    1   |    1   |    ?   |    ?   |   *
    *   |   0   |    0   |    0   |    ?   |    ?   |   *
    \*                                                 */
    const register = new Register()
    register.LOAD = true
    register.CLK = false
    register.CLK = true
    register.LOAD = false
    eq(register.type, "Register.Bit")
    eq(register.toString(), '{"type":"Register.Bit","LOAD":false,"Q":false}')
    eq(typeof register.Q, "boolean")
    register.LOAD = true
    register.D = true
    register.CLK = false
    register.CLK = true
    dEq(register.toJSON(), {
      type: "Register.Bit",
      D: true,
      LOAD: true,
      Q: true,
    })
    eq(register.Q, true)
    register.D = false
    register.CLK = false
    register.CLK = true
    dEq(register.toJSON(), {
      type: "Register.Bit",
      D: false,
      LOAD: true,
      Q: false,
    })
    eq(register.Q, false)
  })
  it("Register.Multi", () => {
    const eight_bit_r = new MultiBitRegister(8)
    eight_bit_r.LOAD = true
    eight_bit_r.OUT = false
    eight_bit_r.CLK = false
    eight_bit_r.CLK = true
    eight_bit_r.LOAD = false
    eq(eight_bit_r.type, "Register.Multi")
    eq(
      eight_bit_r.toString(),
      '{"type":"Register.Multi","LOAD":false,"OUT":false,"Q":[false,false,false,false,false,false,false,false],"BUS":[null,null,null,null,null,null,null,null]}',
    )
    eight_bit_r.LOAD = true
    eight_bit_r.OUT = true
    eight_bit_r.D = h.bytes.x00
    eight_bit_r.CLK = false
    eight_bit_r.CLK = true
    eq(
      eight_bit_r.toString(),
      '{"type":"Register.Multi","D":[false,false,false,false,false,false,false,false],"LOAD":true,"OUT":true,"Q":[false,false,false,false,false,false,false,false],"BUS":[false,false,false,false,false,false,false,false]}',
    )
    eight_bit_r.D = h.bytes.xFF
    eight_bit_r.CLK = false
    eight_bit_r.CLK = true
    eq(
      eight_bit_r.toString(),
      '{"type":"Register.Multi","D":[true,true,true,true,true,true,true,true],"LOAD":true,"OUT":true,"Q":[true,true,true,true,true,true,true,true],"BUS":[true,true,true,true,true,true,true,true]}',
    )
  })
})
