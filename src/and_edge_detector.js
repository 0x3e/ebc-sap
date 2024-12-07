  /*                                            *\
  *         ANDEdgeDetector                      *
  *     A --+----------|&&\                      *
  *         |          |&& )---- Q               *
  *         | | \    .-|&&/                      *
  *         `-|N )o--'                           *
  *           | /                                *
  \*                                            */
import * as Gates from "./gates.js"
export class ANDEdgeDetector {
  #A = undefined
  #Q = undefined
  #INV = new Gates.NOT()
  #AND = new Gates.AND()
  static type = "ANDEdgeDetector"

  constructor() {
    this.#INV.sendQ(Q => this.#AND.setB(Q))
  }

  sendQ(fun) {
    this.#AND.sendQ(fun)
  }

  process() {
    this.#Q = this.#AND.Q
  }

  setA(a) {
    if (this.#A === a) return
    this.#A = a
    this.#AND.A = a
    this.#INV.A = a
    this.process()
  }

  set A(a) {
    this.setA(a)
  }

  get Q() {
    return this.#Q
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      A: this.#A,
      Q: this.Q,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
