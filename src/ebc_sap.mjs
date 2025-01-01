import {ALU} from "./alu.mjs"
import {Bus} from "./bus.mjs"
import {EightBitComputerSimpleAsPossibleHTMLDisplay} from "./display/ebc_sap.mjs"
import * as h from "./helpers.mjs"
import {FourBitAddressable} from "./rams.mjs"
import {MultiBitRegister} from "./registers.mjs"
export class EightBitComputerSimpleAsPossible {
  #clock = undefined
  #pc = undefined
  #bus = new Bus()
  #mar = new MultiBitRegister(4)
  #ram = new FourBitAddressable()
  #a_register = new MultiBitRegister(8)
  #alu = new ALU()
  #b_register = new MultiBitRegister(8)
  #ir = undefined
  #output = undefined
  #display = undefined

  constructor() {
    //TODO move to init from ir
    this.#a_register.setLOAD(false)
    this.#a_register.setOUT(false)
    this.#alu.setSU(false)
    this.#alu.setEU(false)
    this.#b_register.setLOAD(false)
    this.#b_register.setOUT(false)

    //    this.#ram.sendOUT(OUT => this.#bus.io(OUT))

    this.#a_register.sendBUS(BUS => this.#bus.io(BUS))
    this.#a_register.sendQ(Q => this.#alu.setA(Q))

    this.#alu.sendOUT(OUT => this.#bus.io(OUT))

    this.#b_register.sendBUS(BUS => this.#bus.io(BUS))
    this.#b_register.sendQ(Q => this.#alu.setB(Q))

    this.#bus.sendBUS(BUS => this.#a_register.setD(BUS))
    //    this.#bus.sendBUS(BUS => this.#mar.setD(BUS))
    this.#bus.sendBUS(BUS => this.#b_register.setD(BUS))
    //    this.#bus.sendBUS(BUS => this.#ram.setIN(BUS))
  }

  browser_init(cont) {
    const ebc_cont = document.getElementById(cont)
    this.#display = new EightBitComputerSimpleAsPossibleHTMLDisplay(ebc_cont)
    this.#display.clock = this.#clock
    this.#display.pc = this.#pc
    this.#display.bus = this.#bus
    this.#display.mar = this.#mar
    this.#display.ram = this.#ram
    this.#display.a_register = this.#a_register
    this.#display.alu = this.#alu
    this.#display.b_register = this.#b_register
    this.#display.ir = this.#ir
    this.#display.output = this.#output
  }

  get bus() {
    return this.#bus
  }

  get a_register() {
    return this.#a_register
  }

  get alu() {
    return this.#alu
  }

  get b_register() {
    return this.#b_register
  }
}
