import {BitsDisplay} from "./bits.mjs"
import {FourBitAddressableDisplay} from "./rams.mjs"
export class EightBitComputerSimpleAsPossibleHTMLDisplay {
  #cont = undefined
  #pc = undefined
  #bus = undefined
  #mar = undefined
  #ram = undefined
  #a_register = undefined
  #alu = undefined
  #b_register = undefined
  #ir = undefined
  #output = undefined

  constructor(cont) {
    this.#cont = cont
    this.#cont.innerHTML = this.html()
    //this.#pc = new ProgramCounterDisplay()
    this.#bus = new BitsDisplay()
    this.#bus.add_container(cont.querySelector("#bus"))
    //this.#mar = new BitsDisplay()
    //this.#mar.add_container(cont.querySelector("#mar"))
    //this.#ram = new FourBitAddressableDisplay()
    //this.#ram.add_container(cont.querySelector("#ram"))
    this.#a_register = new BitsDisplay()
    this.#a_register.add_container(cont.querySelector("#a_register"))
    this.#alu = new BitsDisplay()
    this.#alu.add_container(cont.querySelector("#alu"))
    this.#b_register = new BitsDisplay()
    this.#b_register.add_container(cont.querySelector("#b_register"))
    //this.#ir = new IRDisplay()
    //this.#output = new OutputDisplay()
  }
  set pc(pc) {
    //    this.#pc.pc = pc
  }
  set bus(bus) {
    this.#bus.watch = bus
  }
  set mar(mar) {
    //    this.#mar.mar = mar
  }
  set ram(ram) {
    //this.#ram.fourBitAddressable = ram
  }
  set a_register(r) {
    this.#a_register.watch = r
  }
  set alu(alu) {
    this.#alu.watch = alu
  }
  set b_register(r) {
    this.#b_register.watch = r
  }
  set ir(ir) {
    //    this.#ir.ir = ir
  }
  set output(output) {
    //    this.#output.output = output
  }
  html() {
    return `\
<div id=pc></div><div id=bus></div><div id=mar></div><div id=ram></div><div id=a_register></div><div id=alu></div><div id=b_register></div><div id=ir></div><div id=output></div>`
  }
}
