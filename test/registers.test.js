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
    register.OUT = false
    register.CLK = false
    register.CLK = true
    register.LOAD = false
    eq(register.type, "Register")
    eq(register.toString(), '{"type":"Register","LOAD":false,"OUT":false}')
    eq(typeof register.Q, "undefined")
    register.LOAD = true
    register.D = true
    register.CLK = false
    register.CLK = true
    dEq(register.toJSON(), {
      type: "Register",
      D: true,
      LOAD: true,
      OUT: false,
      Q: undefined,
    })
    eq(register.Q, undefined)
    register.OUT = true
    register.CLK = false
    register.CLK = true
    dEq(register.toJSON(), {
      type: "Register",
      D: true,
      LOAD: true,
      OUT: true,
      Q: true,
    })
    eq(register.Q, true)
    register.D = false
    register.CLK = false
    register.CLK = true
    dEq(register.toJSON(), {
      type: "Register",
      D: false,
      LOAD: true,
      OUT: true,
      Q: false,
    })
    eq(register.Q, false)
  })
  it("MultiBitRegister", () => {
    const eight_bit_r = new MultiBitRegister(8)
    eight_bit_r.LOAD = true
    eight_bit_r.OUT = false
    eight_bit_r.CLK = false
    eight_bit_r.CLK = true
    eight_bit_r.LOAD = false
    eq(eight_bit_r.type, "MultiBitRegister")
    eq(
      eight_bit_r.toString(),
      '{"type":"MultiBitRegister","LOAD":false,"OUT":false,"Q":[null,null,null,null,null,null,null,null]}',
    )
    eight_bit_r.LOAD = true
    eight_bit_r.OUT = true
    eight_bit_r.D = h.bytes.x00
    eight_bit_r.CLK = false
    eight_bit_r.CLK = true
    eq(
      eight_bit_r.toString(),
      '{"type":"MultiBitRegister","D":[false,false,false,false,false,false,false,false],"LOAD":true,"OUT":true,"Q":[false,false,false,false,false,false,false,false]}',
    )
    eight_bit_r.D = h.bytes.xFF
    eight_bit_r.CLK = false
    eight_bit_r.CLK = true
    eq(
      eight_bit_r.toString(),
      '{"type":"MultiBitRegister","D":[true,true,true,true,true,true,true,true],"LOAD":true,"OUT":true,"Q":[true,true,true,true,true,true,true,true]}',
    )
  })
})
