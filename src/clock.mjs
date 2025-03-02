/*                                                                      *\
* = Clock                                                                *
*                                                                        *
*  astable_pulse ----------------|&&\0                                   *
*                                |&& )--.                                *
*                  .-------------|&&/   |                                *
*                  |                    `--\OR\1                         *
*  select ---------|    | \0                )OR)----|&&\2                *
*                  `----|N )o----|&&\1 .---/OR/     |&& )---- output     *
*                       | /      |&& )-'        .---|&&/                 *
*                           .----|&&/           |                        *
*  manual_pulse ------------'                   |                        *
*                                               |                        *
*                    | \1                       |                        *
*  HLT --------------|N )o----------------------'                        *
*                    | /                                                 *
*                                                                        *
\*                                                                      */
import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Clock {
  #astable_pulse = undefined
  #select = undefined
  #manual_pulse = undefined
  #HLT = undefined
  #Q = undefined
  #sendsQ = []
  #pubSub = new PubSub()

  #AND = h.ArrayOf(3, () => new Gates.AND())
  #OR = h.ArrayOf(3, () => new Gates.OR())
  #NOT = [new Gates.NOT(), new Gates.NOT()]

  static type = "Clock"

  constructor() {
    this.#AND[0].sendQ(Q => this.#OR[0].setA(Q))
    this.#OR[0].sendQ(Q => this.#AND[2].setA(Q))
    this.#NOT[0].sendQ(Q => this.#AND[1].setA(Q))
    this.#AND[1].sendQ(Q => this.#OR.setB(Q))
    this.#NOT[1].sendQ(Q => this.#AND[2].setB(Q))
  }

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#AND[0].setA(this.#astable_pulse)
    this.#AND[0].setB(this.#select)
    this.#NOT[0].setB(this.#select)
    this.#AND[1].setB(this.#manual_pulse)
    this.#NOT[1].setA(this.#HLT)
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
    this.#pubSub.pub()
  }

  setManualPulse(p) {
    if (this.#manual_pulse === p) return
    this.#manual_pulse = p
    this.process()
  }

  set manual_pulse(p) {
    this.setManualPulse(p)
  }

  setSelect(s) {
    if (this.#select === s) return
    this.#select = s
    this.process()
  }

  set select(s) {
    this.setSelect(s)
  }

  setHLT(h) {
    if (this.#HLT === h) return
    this.#HLT = h
    this.process()
  }

  set HLT(h) {
    this.setHLT(h)
  }
}
