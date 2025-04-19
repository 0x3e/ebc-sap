import {DLatch} from "./d_latch.mjs"
import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class Bit {
  #WR = undefined
  #EN = undefined
  #IN = undefined
  #Q = undefined
  #OUT = undefined

  #DLatch = new DLatch()
  #TRISTATE = new Gates.TriState()

  #pubSub = new PubSub()

  static type = "Ram.Bit"

  constructor() {
    this.#DLatch.sendQ(Q => this.#TRISTATE.setA(Q))
  }

  sendOUT(fun) {
    this.#TRISTATE.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#OUT = this.#TRISTATE.Q
    this.#pubSub.pub()
  }

  setWR(wr) {
    if (this.#WR === wr) return
    this.#WR = wr
    this.#DLatch.EN = wr
    this.process()
  }

  set WR(wr) {
    this.setWR(wr)
  }

  setEN(en) {
    if (this.#EN === en) return
    this.#EN = en
    this.#TRISTATE.B = en
    this.process()
  }

  set EN(en) {
    this.setEN(en)
  }

  setIN(d) {
    if (this.#IN === d) return
    this.#IN = d
    this.#DLatch.D = d
    this.process()
  }

  set IN(d) {
    this.setIN(d)
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
      WR: this.#WR,
      EN: this.#EN,
      IN: this.#IN,
      OUT: this.#OUT,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class EightBitWord {
  #WR = undefined
  #EN = undefined
  #IN = undefined
  #OUT = undefined

  #bit = h.ArrayOf(8, () => new Bit())

  #sendsOUT = []
  #pubSub = new PubSub()

  static type = "Ram.EightBitWord"

  sendOUT(fun) {
    this.#sendsOUT.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#OUT = this.#bit.map(bit => bit.OUT)
    for (const fun of this.#sendsOUT) {
      fun(this.#OUT)
    }
    this.#pubSub.pub()
  }

  setWR(wr) {
    if (this.#WR === wr) return
    this.#WR = wr
    for (const bit of this.#bit) bit.setWR(wr)
    this.process()
  }

  set WR(wr) {
    this.setWR(wr)
  }

  setEN(en) {
    if (this.#EN === en) return
    this.#EN = en
    for (const bit of this.#bit) bit.setEN(en)
    this.process()
  }

  set EN(en) {
    this.setEN(en)
  }

  setIN(d) {
    if (this.#IN === d) return
    this.#IN = d
    this.#bit.forEach((bit, i) => bit.setIN(d[i]))
    this.process()
  }

  set IN(d) {
    this.setIN(d)
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
      WR: this.#WR,
      EN: this.#EN,
      IN: this.#IN,
      OUT: this.#OUT,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class FourBitAddressable {
  //TODO fix the address decoder block to use gates
  #WR = undefined
  #EN = undefined
  #ADDR = undefined
  #IN = undefined
  #OUT = undefined
  #BUS = undefined

  #word = h.ArrayOf(16, () => new EightBitWord())

  #sendsOUT = []
  #pubSub = new PubSub()

  static type = "Ram.FourBitAddressable"

  sendOUT(fun) {
    this.#sendsOUT.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    if (h.isBits(this.#ADDR)) {
      this.#word[h.bitsToInt(this.#ADDR)].setWR(this.#WR)
      this.#word[h.bitsToInt(this.#ADDR)].setEN(this.#EN)
      this.#word[h.bitsToInt(this.#ADDR)].setIN(this.#IN)
      this.#OUT = this.#word[h.bitsToInt(this.#ADDR)].OUT
      for (const fun of this.#sendsOUT) fun(this.#OUT)
      this.#pubSub.pub()
    }
  }

  setWR(wr) {
    if (this.#WR === wr) return
    this.#WR = wr
    this.process()
  }

  set WR(wr) {
    this.setWR(wr)
  }

  setEN(en) {
    if (this.#EN === en) return
    this.#EN = en
    this.process()
  }

  set EN(en) {
    this.setEN(en)
  }

  setADDR(addr) {
    if (this.#ADDR === addr) return
    if (h.isBits(this.#ADDR)) {
      this.#word[h.bitsToInt(this.#ADDR)].setWR(false)
      this.#word[h.bitsToInt(this.#ADDR)].setEN(false)
    }
    this.#ADDR = addr
    this.process()
  }

  set ADDR(addr) {
    this.setADDR(addr)
  }

  setIN(d) {
    if (this.#IN === d) return
    this.#IN = d
    this.process()
  }

  set IN(d) {
    this.setIN(d)
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
      WR: this.#WR,
      EN: this.#EN,
      ADDR: this.#ADDR,
      IN: this.#IN,
      OUT: this.#OUT,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
