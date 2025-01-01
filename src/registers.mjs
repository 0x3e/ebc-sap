import {DFlipFlop} from "./d_flipflop.mjs"
import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Register {
  #D = undefined
  #LOAD = undefined
  #Q = undefined
  #CLK = undefined
  #INV = new Gates.NOT()
  #AND = [new Gates.AND(), new Gates.AND()]
  #OR = new Gates.OR()
  #DFLIPFLOP = new DFlipFlop()
  #pubSub = new PubSub()

  static type = "Register.Bit"

  constructor() {
    this.#INV.sendQ(Q => this.#AND[0].setB(Q))
    this.#AND[0].sendQ(Q => this.#OR.setA(Q))
    this.#AND[1].sendQ(Q => this.#OR.setB(Q))
    this.#OR.sendQ(Q => this.#DFLIPFLOP.setD(Q))
    this.#DFLIPFLOP.sendQ(Q => this.#AND[0].setA(Q))
  }

  sendQ(fun) {
    this.#DFLIPFLOP.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#DFLIPFLOP.Q
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
      Q: this.#Q,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class MultiBitRegister {
  #D = undefined
  #LOAD = undefined
  #OUT = undefined
  #Q = undefined
  #BUS = undefined
  #CLK = undefined
  #register = undefined
  #tristate = undefined

  #sendsQ = []
  #sendsBUS = []
  #pubSub = new PubSub()

  static type = "Register.Multi"

  constructor(bits) {
    this.#register = h.ArrayOf(bits, () => new Register())
    this.#tristate = h.ArrayOf(bits, () => new Gates.TriState())
    for (let i = 0; i < bits; i++) {
      this.#register[i].sendQ(Q => this.#tristate[i].setA(Q))
    }
  }

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  sendBUS(fun) {
    this.#sendsBUS.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#Q = this.#register.map(register => register.Q)
    this.#BUS = this.#tristate.map(t => t.Q)
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
    for (const fun of this.#sendsBUS) {
      fun(this.#BUS)
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
    for (const reg of this.#register) reg.setLOAD(l)
    this.process()
  }

  set LOAD(l) {
    this.setLOAD(l)
  }

  setOUT(o) {
    if (this.#OUT === o) return
    this.#OUT = o
    for (const t of this.#tristate) t.setB(o)
    this.process()
  }

  set OUT(o) {
    this.setOUT(o)
  }

  setCLK(clk) {
    for (const reg of this.#register) reg.setCLK(clk)
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

  get BUS() {
    return this.#BUS
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
      BUS: this.#BUS,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
