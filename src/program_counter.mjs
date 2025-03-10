import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {JKFlipFlop} from "./jk_flipflop.mjs"
import {PubSub} from "./pub_sub.mjs"

export class ProgramCounter {
  #OUT = undefined
  #JUMP = undefined
  #ENABLE = undefined
  #CLK = undefined
  #Q = undefined
  #BUS = undefined
  #jk_flipflop = undefined
  #tristate = undefined
  #counter_size = 4

  #sendsQ = []
  #sendsBUS = []
  #pubSub = new PubSub()

  static type = "ProgramCounter"

  constructor() {
    this.#jk_flipflop = h.ArrayOf(this.#counter_size, () => new JKFlipFlop())
    this.#tristate = h.ArrayOf(this.#counter_size, () => new Gates.TriState())
    for (let i = 0; i < this.#counter_size; i++) {
      this.#jk_flipflop[i].J = true
      this.#jk_flipflop[i].K = true
      if (i < this.#counter_size - 1)
        this.#jk_flipflop[i].sendQ(Q => this.#jk_flipflop[i + 1].setCLK(Q))
      this.#jk_flipflop[i].sendQ(Q => this.#tristate[i].setA(Q))
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
    this.#Q = this.#jk_flipflop.map(jk => jk.Q)
    this.#BUS = this.#tristate.map(t => t.Q)
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
    for (const fun of this.#sendsBUS) {
      fun(this.#BUS)
    }
    this.#pubSub.pub()
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

  setJUMP(j) {
    if (this.#JUMP === j) return
    this.#JUMP = j
    if (Array.isArray(this.#JUMP)) {
      for (let i = 0; i < this.#counter_size; i++) {
        if (j[i]) {
          this.#jk_flipflop[i].J = true
          this.#jk_flipflop[i].K = false
        } else {
          this.#jk_flipflop[i].J = false
          this.#jk_flipflop[i].K = true
        }
      }
      this.#JUMP = 1
    }

    if (this.#JUMP === 4) {
      for (let i = 0; i < this.#counter_size; i++) {
        this.#jk_flipflop[i].J = true
        this.#jk_flipflop[i].K = true
      }
      this.#JUMP = false
    }

    this.process()
  }

  set JUMP(j) {
    this.setJUMP(j)
  }

  setENABLE(e) {
    if (this.#ENABLE === e) return
    this.#ENABLE = e
  }

  set ENABLE(e) {
    this.setENABLE(e)
  }

  setCLK(clk) {
    if (this.#CLK === clk) return
    this.#CLK = clk
    if (Number.isInteger(this.#JUMP) && this.#JUMP < 4 ) this.JUMP = this.#JUMP + 1 
    if (!this.#ENABLE && !this.#JUMP) return

    if (this.#JUMP)
      for (const jk of this.#jk_flipflop) jk.setCLK(clk)
    else 
      this.#jk_flipflop[0].setCLK(clk)

    this.process()
  }

  set CLK(clk) {
    this.setCLK(clk)
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      OUT: this.#OUT,
      JUMP: this.#JUMP,
      ENABLE: this.#ENABLE,
      CLK: this.#CLK,
      Q: this.#Q,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
