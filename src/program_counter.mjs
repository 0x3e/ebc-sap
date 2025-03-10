import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {JKFlipFlop} from "./jk_flipflop.mjs"
import {PubSub} from "./pub_sub.mjs"

export class ProgramCounter {
  #OUT = undefined
  #JUMP = undefined
  #ENABLE = undefined
  #Q = undefined
  #tristate = undefined

  static type = "ProgramCounter"

  constructor() {
    this.#tristate = h.ArrayOf(4, () => new Gates.TriState())
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
      OUT: this.#astable_pulse,
      JUMP: this.#interval,
      ENABLE: this.#select,
      Q: this.#Q,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
