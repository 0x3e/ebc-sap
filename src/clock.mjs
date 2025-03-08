/*                                                                      *\
* = Clock                                                                *
*                                                                        *
*  astable_pulse ----------------|&&\0                                   *
*                                |&& )--.                                *
*                  .-------------|&&/   |                                *
*                  |                    `--\OR\                          *
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
  #interval = 1000
  #select = undefined
  #manual_pulse = undefined
  #HLT = undefined
  #Q = undefined
  #sendsQ = []
  #pubSub = new PubSub()

  #timeoutObj = undefined
  #AND = h.ArrayOf(3, () => new Gates.AND())
  #OR = new Gates.OR()
  #NOT = [new Gates.NOT(), new Gates.NOT()]

  static type = "Clock"

  constructor() {
    this.#AND[0].sendQ(Q => this.#OR.setA(Q))
    this.#OR.sendQ(Q => this.#AND[2].setA(Q))
    this.#NOT[0].sendQ(Q => this.#AND[1].setA(Q))
    this.#AND[1].sendQ(Q => this.#OR.setB(Q))
    this.#NOT[1].sendQ(Q => this.#AND[2].setB(Q))
  }

  start_interval() {
    const toggle_astable_pulse = () => {
      this.astable_pulse = !this.#astable_pulse
    }
    this.#timeoutObj = setInterval(toggle_astable_pulse, this.#interval)
  }

  stop_interval() {
    clearInterval(this.#timeoutObj)
  }

  destroy() {
    this.stop_interval()
    this.#sendsQ = []
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
    this.#NOT[0].set(this.#select)
    this.#AND[1].setB(this.#manual_pulse)
    this.#NOT[1].set(this.#HLT)
    this.#Q = this.#AND[2].Q
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

  setAstablePulse(p) {
    if (!this.#select) this.stop_interval()
    this.#astable_pulse = p
    this.process()
  }

  set astable_pulse(p) {
    this.setAstablePulse(p)
  }

  setInterval(i) {
    if (i <= 100000 && i >= 100) {
      this.#interval = i
      return true
    }

    return false
  }

  set interval(i) {
    if (this.#interval === i) return
    this.setInterval(i)
    if (!this.#select) return
    this.stop_interval()
    this.start_interval()
  }

  setSelect(s) {
    if (this.#select === s) return
    this.#select = s
    this.process()
    if (this.#select) this.start_interval()
    else this.stop_interval()
  }

  set select(s) {
    this.setSelect(s)
  }

  setHLT(h) {
    if (this.#HLT === h) return
    this.#HLT = h
    if (h) this.stop_interval()
    else this.start_interval()
    this.process()
  }

  set HLT(h) {
    this.setHLT(h)
  }

  get output() {
    return this.#Q
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      astable_pulse: this.#astable_pulse,
      interval: this.#interval,
      select: this.#select,
      manual_pulse: this.#manual_pulse,
      HLT: this.#HLT,
      output: this.#Q,
      Q: [this.#Q],
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
