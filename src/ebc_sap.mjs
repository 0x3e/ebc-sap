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
}
