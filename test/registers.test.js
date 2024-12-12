import {describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import {Register} from "../src/registers.mjs"

describe("Register", () => {
  it("is", () => {
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
    eq(
      register.toString(),
      '{"type":"Register","D":true,"LOAD":true,"OUT":false}',
    )
    eq(register.Q, undefined)
    register.OUT = true
    register.CLK = false
    register.CLK = true
    eq(
      register.toString(),
      '{"type":"Register","D":true,"LOAD":true,"OUT":true,"Q":true}',
    )
    eq(register.Q, true)
  })
})
