import {ANDEdgeDetector} from "./and_edge_detector.mjs"
import {DLatch} from "./d_latch.mjs"
import {PubSub} from "./pub_sub.mjs"

export class DFlipFlop {
  #D = undefined
  #CLK = undefined
  #Q = undefined
  #NOTQ = undefined
  #DLatch = new DLatch()
  #ANDED = new ANDEdgeDetector()
  #pubSub = new PubSub()

  static type = "DFlipFlop"

  constructor() {
    this.#ANDED.sendQ(Q => this.#DLatch.setEN(Q))
  }

  sendQ(fun) {
    this.#DLatch.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#DLatch.Q
    this.#NOTQ = this.#DLatch.NOTQ
    this.#pubSub.pub()
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
    this.#ANDED.A = clk
    this.process()
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
