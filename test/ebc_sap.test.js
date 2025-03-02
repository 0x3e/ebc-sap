import {dEq, describe, eq, it, ok} from "../lib/test.mjs"
import {EightBitComputerSimpleAsPossible} from "../src/ebc_sap.mjs"
import * as h from "../src/helpers.mjs"

describe("EightBitComputerSimpleAsPossible", () => {
  it("init", () => {
    const ebc_sap = new EightBitComputerSimpleAsPossible()
    ebc_sap.destroy()
  })
  it("bus alu", () => {
    const ebc_sap = new EightBitComputerSimpleAsPossible()
    ebc_sap.a_register.setLOAD(true)
    ebc_sap.bus.io([true, false, true, false, true, false, true, false])
    ebc_sap.a_register.setCLK(false)
    ebc_sap.a_register.setCLK(true)
    ebc_sap.a_register.setCLK(false)
    ebc_sap.a_register.setLOAD(false)
    ebc_sap.b_register.setLOAD(true)
    ebc_sap.bus.io([false, true, false, true, false, true, false, true])
    ebc_sap.b_register.setCLK(false)
    ebc_sap.b_register.setCLK(true)
    ebc_sap.b_register.setCLK(false)
    ebc_sap.b_register.setLOAD(false)
    ebc_sap.alu.setEU(true)
    eq(
      h.bitsToInt(ebc_sap.bus.BUS),
      h.bitsToInt([true, true, true, true, true, true, true, true]),
    )
    ebc_sap.destroy()
  })
})
