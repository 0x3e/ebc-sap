import {EightBitAdder} from "./adders.mjs"
import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class ALU {
  #A = undefined
  #B = undefined

  #Q = undefined
  #OUT = undefined

  #SU = undefined
  #EU = undefined

  #XOR = h.ArrayOf(8, () => new Gates.XOR())
  #TRISTATE = h.ArrayOf(8, () => new Gates.TriState())
  #adder = new EightBitAdder()

  #sendsQ = []
  #sendsOUT = []
  #pubSub = new PubSub()

  static type = "ALU"

  constructor() {
    this.#adder.sendSUM(SUM => {
      for (const [i, t] of this.#TRISTATE.entries()) t.setA(SUM[i])
    })
  }

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  sendOUT(fun) {
    this.#sendsOUT.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    //TODO better wiring of these. Collection class to replace ArrayOf
    this.#adder.B = this.#XOR.map(xor => xor.Q)
    this.#Q = this.#adder.SUM
    this.#OUT = this.#TRISTATE.map(t => t.Q)
    for (const fun of this.#sendsOUT) {
      fun(this.#OUT)
    }
    this.#pubSub.pub()
  }

  setA(a) {
    if (this.#A === a) return
    this.#A = a
    this.#adder.setA(a)
    this.process()
  }

  set A(a) {
    this.setA(a)
  }

  setB(b) {
    if (this.#B === b) return
    this.#B = b
    for (const [i, bit] of b.entries()) this.#XOR[i].setA(bit)
    this.process()
  }

  set B(b) {
    this.setB(b)
  }

  setSU(su) {
    if (this.#SU === su) return
    this.#SU = su
    for (const xor of this.#XOR) xor.setB(su)
    this.#adder.C = su
    this.process()
  }

  set SU(su) {
    this.setSU(su)
  }

  setEU(eu) {
    if (this.#EU === eu) return
    this.#EU = eu
    for (const t of this.#TRISTATE) t.setB(eu)
    this.process()
  }

  set EU(eu) {
    this.setEU(eu)
  }

  get Q() {
    return this.#Q
  }

  get OUT() {
    return this.#OUT
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      A: this.#A,
      B: this.#B,
      Q: this.#Q,
      OUT: this.#OUT,
      SU: this.#SU,
      EU: this.#EU,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
