import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Bus {
  #BUS = h.bytes.xZZ
  #num = 0

  #sendsBUS = []
  #pubSub = new PubSub()

  static type = "Bus"

  sendBUS(fun) {
    this.#sendsBUS.push(fun)
  }

  io(Byte) {
    if (this.#num > 20) {
      this.#num = 0
      return this.#BUS
    }
    if (h.isUndefBits(Byte)) return this.#BUS
    if (this.#BUS === Byte) return Byte
    if (h.ArrayShallowEq(this.#BUS, Byte)) {
      this.#BUS = Byte
      return Byte
    }
    this.#num += 1
    const bus = this.#BUS.slice()
    for (const [i, bit] of Byte.entries()) {
      if (bit !== undefined) bus[i] = bit
    }
    this.#BUS = bus
    for (const fun of this.#sendsBUS) fun(bus)
    this.#pubSub.pub()

    return this.#BUS
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  get type() {
    return this.constructor.type
  }

  get BUS() {
    return this.#BUS
  }

  get Q() {
    return this.#BUS
  }

  toJSON() {
    return {
      type: this.type,
      BUS: this.#BUS,
      Q: this.#BUS,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
