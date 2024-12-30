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
    //this.#bus = new BusDisplay()
    this.#mar = new RegisterDisplay()
    this.#mar.add_container(cont.querySelector("#mar"))
    this.#ram = new FourBitAddressableDisplay()
    this.#ram.add_container(cont.querySelector("#ram"))
    this.#a_register = new RegisterDisplay()
    this.#a_register.add_container(cont.querySelector("#a_register"))
    //this.#alu = new ALUDisplay()
    this.#b_register = new RegisterDisplay()
    this.#b_register.add_container(cont.querySelector("#b_register"))
    //this.#ir = new IRDisplay()
    //this.#output = new OutputDisplay()
  }
  set pc(pc) {
    //    this.#pc.pc = pc
  }
  set bus(bus) {
    //    this.#bus.bus = bus
  }
  set mar(mar) {
    //    this.#mar.mar = mar
  }
  set ram(ram) {
    this.#ram.fourBitAddressable = ram
  }
  set a_register(r) {
    this.#a_register.register = r
  }
  set alu(alu) {
    //    this.#alu.alu = alu
  }
  set b_register(r) {
    this.#b_register.register = r
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
