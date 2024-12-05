import {DLatch} from "../src/d_latch.js"
export class DFlipFlop {
  #D = undefined
  #CLK = undefined
  #Q = undefined
  #NOTQ = undefined
  #DLatch = new DLatch()
  static type = "DFlipFlop"

  sendQ(fun) {
    this.#DLatch.sendQ(fun)
  }

  process() {
    this.#Q = this.#DLatch.Q
    this.#NOTQ = this.#DLatch.NOTQ
  }

  setD(d) {
    this.#D = d
    this.#DLatch.setD(d)
  }

  set D(d) {
    this.setD(d)
  }

  setCLK(clk) {
    if (this.#CLK === clk) return
    this.#CLK = clk
    this.#DLatch.EN = clk
    this.process()
    if (this.#CLK === true) this.CLK = false
  }

  set CLK(clk) {
    this.setCLK(clk)
  }

  get Q() {
    return this.#Q
  }

  get NOTQ() {
    return this.#NOTQ
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      D: this.#D,
      CLK: this.#CLK,
      Q: this.Q,
      NOTQ: this.NOTQ,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
