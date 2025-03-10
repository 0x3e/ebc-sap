/*                          DLatch                                      *\
*                            _____                                       *
*                      D ----|   |---- Q                                 *
*                            |   |                                       *
*                     EN ----|   |o--- NOTQ                              *
*                            -----                                       *
\*                                                                      */

import * as Gates from "./gates.mjs"
import {PubSub} from "./pub_sub.mjs"
import {SRLatch} from "./sr_latch.mjs"

export class DLatch {
  #D = undefined
  #EN = undefined
  #Q = undefined
  #NOTQ = undefined
  #SRLATCH = new SRLatch()
  #INV = new Gates.NOT()
  #AND = [new Gates.AND(), new Gates.AND()]
  #pubSub = new PubSub()

  static type = "DLatch"

  constructor() {
    this.#INV.sendQ(Q => this.#AND[0].setA(Q))
    this.#AND[0].sendQ(Q => this.#SRLATCH.setR(Q))
    this.#AND[1].sendQ(Q => this.#SRLATCH.setS(Q))
  }

  sendQ(fun) {
    this.#SRLATCH.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#SRLATCH.Q
    this.#NOTQ = this.#SRLATCH.NOTQ
    this.#pubSub.pub()
  }

  setD(d) {
    if (this.#D === d) return
    this.#D = d
    this.#AND[1].B = d
    this.#INV.A = d
    this.process()
  }

  set D(d) {
    this.setD(d)
  }

  setEN(en) {
    if (this.#EN === en) return
    this.#EN = en
    this.#AND[0].B = en
    this.#AND[1].A = en
    this.process()
  }

  set EN(en) {
    this.setEN(en)
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
      EN: this.#EN,
      Q: this.Q,
      NOTQ: this.NOTQ,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
