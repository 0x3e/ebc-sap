import {DFlipFlop} from "./d_flipflop.mjs"
import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Register {
  #D = undefined
  #LOAD = undefined
  #OUT = undefined
  #Q = undefined
  #CLK = undefined
  #INV = new Gates.NOT()
  #AND = [new Gates.AND(), new Gates.AND()]
  #OR = new Gates.OR()
  #DFLIPFLOP = new DFlipFlop()
  #TRISTATE = new Gates.TriState()
  #pubSub = new PubSub()

  static type = "Register"

  constructor() {
    this.#INV.sendQ(Q => this.#AND[0].setB(Q))
    this.#AND[0].sendQ(Q => this.#OR.setA(Q))
    this.#AND[1].sendQ(Q => this.#OR.setB(Q))
    this.#OR.sendQ(Q => this.#DFLIPFLOP.setD(Q))
    this.#DFLIPFLOP.sendQ(Q => this.#AND[0].setA(Q))
    this.#DFLIPFLOP.sendQ(Q => this.#TRISTATE.setA(Q))
  }

  sendQ(fun) {
    this.#TRISTATE.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#TRISTATE.Q
    this.#pubSub.pub()
  }

  setD(d) {
    if (this.#D === d) return
    this.#D = d
    this.#AND[1].B = d
    this.process()
  }

  set D(d) {
    this.setD(d)
  }

  setLOAD(l) {
    if (this.#LOAD === l) return
    this.#LOAD = l
    this.#INV.A = l
    this.#AND[1].A = l
    this.process()
  }

  set LOAD(l) {
    this.setLOAD(l)
  }

  setOUT(o) {
    if (this.#OUT === o) return
    this.#OUT = o
    this.#TRISTATE.B = o
    this.process()
  }

  set OUT(o) {
    this.setOUT(o)
  }

  setCLK(clk) {
    this.#DFLIPFLOP.setCLK(clk)
    if (this.#CLK === clk) return
    this.#CLK = clk
    this.process()
  }

  set CLK(clk) {
    this.setCLK(clk)
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
      D: this.#D,
      LOAD: this.#LOAD,
      OUT: this.#OUT,
      Q: this.#Q,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class EightBitRegister {
  #D = undefined
  #LOAD = undefined
  #OUT = undefined
  #Q = undefined
  #CLK = undefined
  #register = h.ArrayOf(8, () => new Register())
  #sendsQ = []
  #pubSub = new PubSub()

  static type = "EightBitRegister"

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#register.map(register => register.Q)
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
    this.#pubSub.pub()
  }

  setD(d) {
    if (this.#D === d) return
    this.#D = d
    this.#register.forEach((register, i) => register.setD(d[i]))
    this.process()
  }

  set D(d) {
    this.setD(d)
  }

  setLOAD(l) {
    if (this.#LOAD === l) return
    this.#LOAD = l
    this.#register.forEach((register, i) => register.setLOAD(l))
    this.process()
  }

  set LOAD(l) {
    this.setLOAD(l)
  }

  setOUT(o) {
    if (this.#OUT === o) return
    this.#OUT = o
    this.#register.forEach((register, i) => register.setOUT(o))
    this.process()
  }

  set OUT(o) {
    this.setOUT(o)
  }

  setCLK(clk) {
    this.#register.forEach((register, i) => register.setCLK(clk))
    if (this.#CLK === clk) return
    this.#CLK = clk
    this.process()
  }

  set CLK(clk) {
    this.setCLK(clk)
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
      D: this.#D,
      LOAD: this.#LOAD,
      OUT: this.#OUT,
      Q: this.#Q,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
