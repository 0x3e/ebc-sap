import {ANDEdgeDetector} from "./and_edge_detector.mjs"
import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"
import {SRLatch} from "./sr_latch.mjs"

export class JKFlipFlop {
  #J = undefined
  #K = undefined
  #CLK = undefined
  #Q = undefined
  #NOTQ = undefined
  #SRLatch = [new SRLatch(), new SRLatch()]
  #AND = h.ArrayOf(6, () => new Gates.AND())
  #NOT = new Gates.NOT()

  #pubSub = new PubSub()

  static type = "JKFlipFlop"

  constructor() {
    //J
    this.#SRLatch[1].sendQ(Q => this.#AND[0].setA(!Q))
    this.#AND[0].sendQ(Q => this.#AND[1].setA(Q))
    this.#AND[1].sendQ(Q => this.#SRLatch[0].setS(Q))

    //K
    this.#AND[2].sendQ(Q => this.#AND[3].setA(Q))
    this.#SRLatch[1].sendQ(Q => this.#AND[3].setB(Q))
    this.#AND[3].sendQ(Q => this.#SRLatch[0].setR(Q))

    this.#AND[4].sendQ(Q => this.#SRLatch[1].setR(Q))
    this.#AND[5].sendQ(Q => this.#SRLatch[1].setS(Q))

    this.#SRLatch[0].sendQ(Q => this.#AND[4].setA(!Q))
    this.#SRLatch[0].sendQ(Q => this.#AND[5].setB(Q))

    this.#NOT.sendQ(Q => this.#AND[4].setB(Q))
    this.#NOT.sendQ(Q => this.#AND[5].setA(Q))
  }

  sendQ(fun) {
    this.#SRLatch[1].sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#SRLatch[1].Q
    this.#NOTQ = this.#SRLatch[1].NOTQ
    this.#pubSub.pub()
  }

  setJ(j) {
    if (this.#J === j) return
    this.#J = j
    this.#AND[0].setB(j)
    this.process()
  }

  set J(j) {
    this.setJ(j)
  }

  setK(k) {
    if (this.#K === k) return
    this.#K = k
    this.#AND[2].setB(k)
    this.process()
  }

  set K(k) {
    this.setK(k)
  }

  setCLK(clk) {
    if (this.#CLK === clk) return
    this.#CLK = clk

    if (clk) this.#NOT.setA(clk)
    this.#AND[1].setB(clk)
    this.#AND[2].setA(clk)
    if (!clk) this.#NOT.setA(clk)

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
      J: this.#J,
      K: this.#K,
      CLK: this.#CLK,
      Q: this.#Q,
      NOTQ: this.#NOTQ,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
