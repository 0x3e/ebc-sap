import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Bus {
  #BYTE = []

  io(Byte) {
    for (const [i, bit] of Byte.entries())
      this.#BYTE[i] = bit ?? this.#BYTE[i]
    return this.#BYTE
  }
}
