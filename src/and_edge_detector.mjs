/*                                            *\
  *         ANDEdgeDetector                      *
  *     A --+----------|&&\                      *
  *         |          |&& )---- Q               *
  *         | | \    .-|&&/                      *
  *         `-|N )o--'                           *
  *           | /                                *
  \*                                            */

import * as Gates from "./gates.mjs"
import {PubSub} from "./pub_sub.mjs"

export class ANDEdgeDetector {
  #A = undefined
  #Q = undefined
  #INV = new Gates.NOT()
  #AND = new Gates.AND()
  #pubSub = new PubSub()

  static type = "ANDEdgeDetector"

  constructor() {
    this.#INV.sendQ(Q => this.#AND.setB(Q))
  }

  sendQ(fun) {
    this.#AND.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#AND.Q
    this.#pubSub.pub()
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
