import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Bus {
  #BYTE = []

  #pubSub = new PubSub()

  static type = "Bus"

  io(Byte) {
    for (const [i, bit] of Byte.entries())
      this.#BYTE[i] = bit ?? this.#BYTE[i]
    this.#pubSub.pub()

    return this.#BYTE
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      BUS: this.#BYTE,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
