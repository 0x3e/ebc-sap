import * as Gates from "./gates.js"
export class SRLatch {
  #R = undefined
  #S = undefined
  #Q = undefined
  #NOTQ = undefined
  #NOR = [new Gates.NOR(), new Gates.NOR()]
  #sendsQ = []
  static type = "SRLatch"

  constructor() {
    this.#NOR[0].sendQ(Q => this.#NOR[1].setA(Q))
    this.#NOR[1].sendQ(Q => this.#NOR[0].setB(Q))
  }

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  process() {
    this.#Q = this.#NOR[0].Q
    this.#NOTQ = this.#NOR[1].Q
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
  }

  setS(s) {
    if (this.#S === s) return
    this.#S = s
    this.#NOR[1].B = s
    this.process()
  }

  set S(s) {
    this.setS(s)
  }

  setR(r) {
    if (this.#R === r) return
    this.#R = r
    this.#NOR[0].A = r
    this.process()
  }

  set R(r) {
    this.setR(r)
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
      S: this.#S,
      R: this.#R,
      Q: this.Q,
      NOTQ: this.NOTQ,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
