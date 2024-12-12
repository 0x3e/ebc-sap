/*                             Gate                                       *\
*                        A ----|??\   Q                                    *
*                              ??? )?---                                   *
*                        B ----|??/                                        *
\*                                                                        */

import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Gate {
  #A = undefined
  #B = undefined
  #Q = undefined
  #sendsQ = []
  #pubSub = new PubSub()

  static type = "Gate"

  calculateOutput(a, b) {
    /* must be implemented by subclass */
    if (/* never */ a === b && a !== b) return undefined
    throw new Error("Method calculateOutput not implemented")
  }

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.calculateOutput(this.#A, this.#B)
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
    this.#pubSub.pub()
  }

  setA(a) {
    if (this.#A === a) return
    this.#A = a
    this.process()
  }

  set A(a) {
    this.setA(a)
  }

  setB(b) {
    if (this.#B === b) return
    this.#B = b
    this.process()
  }

  set B(b) {
    this.setB(b)
  }

  get Q() {
    return this.#Q
  }
  get type() {
    return this.constructor.type
  }

  set(a, b) {
    if (this.#A === a && this.#B === b) return this.#Q
    const rnd = h.randomBit()
    // prevent a bias by randomizing which is set first
    if (rnd) this.A = a
    this.B = b
    if (!rnd) this.A = a
    return this.#Q
  }

  static doToJSON(type, a, b, q) {
    return {type: type, A: a, B: b, Q: q}
  }

  toJSON() {
    return this.constructor.doToJSON(this.type, this.#A, this.#B, this.#Q)
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class Wire extends Gate {
  static type = "Gate.Wire"
  static doToJSON(type, a, b, q) {
    return {type: type, A: a, Q: q}
  }
}

export class Buffer extends Wire {
  static type = "Gate.Buffer"
  calculateOutput(a) {
    return a
  }
}

export class NOT extends Wire {
  static type = "Gate.NOT"
  calculateOutput(a) {
    return !a
  }
}

export class TriState extends Gate {
  static type = "Gate.TriState"
  calculateOutput(a, b) {
    let out = a
    if (!b) out = undefined
    return out
  }
}

export class AND extends Gate {
  static type = "Gate.AND"

  calculateOutput(a, b) {
    return a && b
  }
}

export class OR extends Gate {
  static type = "Gate.OR"

  calculateOutput(a, b) {
    return a || b
  }
}

export class NAND extends Gate {
  static type = "Gate.NAND"

  calculateOutput(a, b) {
    return !(a && b)
  }
}

export class NOR extends Gate {
  static type = "Gate.NOR"

  calculateOutput(a, b) {
    return !(a || b)
  }
}
