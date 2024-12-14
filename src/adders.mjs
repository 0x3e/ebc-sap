import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class HalfAdder {
  #A = undefined
  #B = undefined
  #SUM = undefined
  #CARRY = undefined

  #XOR = new Gates.XOR()
  #AND = new Gates.AND()

  #pubSub = new PubSub()

  static type = "HalfAdder"

  sendSUM(fun) {
    this.#XOR.sendQ(fun)
  }

  sendCARRY(fun) {
    this.#AND.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#SUM = this.#XOR.Q
    this.#CARRY = this.#AND.Q
    this.#pubSub.pub()
  }

  setA(a) {
    if (this.#A === a) return
    this.#A = a
    this.#XOR.A = a
    this.#AND.A = a
    this.process()
  }

  set A(a) {
    this.setA(a)
  }

  setB(b) {
    if (this.#B === b) return
    this.#B = b
    this.#XOR.B = b
    this.#AND.B = b
    this.process()
  }

  set B(b) {
    this.setB(b)
  }

  get SUM() {
    return this.#SUM
  }

  get CARRY() {
    return this.#CARRY
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      A: this.#A,
      B: this.#B,
      SUM: this.#SUM,
      CARRY: this.#CARRY,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class FullAdder {
  #A = undefined
  #B = undefined
  #C = undefined
  #SUM = undefined
  #CARRY = undefined

  #halfAdder = [new HalfAdder(), new HalfAdder()]
  #OR = new Gates.OR()

  #pubSub = new PubSub()

  static type = "FullAdder"

  constructor() {
    this.#halfAdder[0].sendSUM(SUM => this.#halfAdder[1].setA(SUM))
    this.#halfAdder[0].sendCARRY(CARRY => this.#OR.setB(CARRY))
    this.#halfAdder[1].sendCARRY(CARRY => this.#OR.setA(CARRY))
  }

  sendSUM(fun) {
    this.#halfAdder[1].sendQ(fun)
  }

  sendCARRY(fun) {
    this.#OR.sendQ(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#SUM = this.#halfAdder[1].SUM
    this.#CARRY = this.#OR.Q
    this.#pubSub.pub()
  }

  setA(a) {
    if (this.#A === a) return
    this.#A = a
    this.#halfAdder[0].A = a
    this.process()
  }

  set A(a) {
    this.setA(a)
  }

  setB(b) {
    if (this.#B === b) return
    this.#B = b
    this.#halfAdder[0].B = b
    this.process()
  }

  set B(b) {
    this.setB(b)
  }

  setC(c) {
    if (this.#C === c) return
    this.#C = c
    this.#halfAdder[1].B = c
    this.process()
  }

  set C(c) {
    this.setC(c)
  }

  get SUM() {
    return this.#SUM
  }

  get CARRY() {
    return this.#CARRY
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      A: this.#A,
      B: this.#B,
      C: this.#C,
      SUM: this.#SUM,
      CARRY: this.#CARRY,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export class EigthBitAdder {
  #A = undefined
  #B = undefined
  #C = undefined

  #SUM = undefined
  #CARRY = undefined

  #adder = h.ArrayOf(8, () => new FullAdder())

  #sendsSUM = []
  #sendsCARRY = []

  #pubSub = new PubSub()

  static type = "EigthBitAdder"

  constructor() {
    this.#adder.forEach((adder, i) => {
      if (!this.#adder[i + 1]) return
      this.#adder[i].sendCARRY(CARRY => this.#adder[i + 1].setC(CARRY))
    })
  }

  sendSUM(fun) {
    this.#sendsSUM.push(fun)
  }

  sendCARRY(fun) {
    this.#sendsCARRY.push(fun)
  }

  sub(fun) {
    return this.#pubSub.sub(fun)
  }

  process() {
    this.#SUM = this.#adder.map(register => register.SUM)
    this.#CARRY = this.#adder[this.#adder.length - 1].CARRY
    for (const fun of this.#sendsSUM) {
      fun(this.#SUM)
    }
    for (const fun of this.#sendsCARRY) {
      fun(this.#CARRY)
    }
    this.#pubSub.pub()
  }

  setA(a) {
    if (this.#A === a) return
    this.#A = a
    this.#adder.forEach((adder, i) => adder.setA(a[i]))
    this.process()
  }

  set A(a) {
    this.setA(a)
  }

  setB(b) {
    if (this.#B === b) return
    this.#B = b
    this.#adder.forEach((adder, i) => adder.setB(b[i]))
    this.process()
  }

  set B(b) {
    this.setB(b)
  }

  setC(c) {
    if (this.#C === c) return
    this.#C = c
    this.#adder[0].C = c
    this.process()
  }

  set C(c) {
    this.setC(c)
  }

  get SUM() {
    return this.#SUM
  }

  get CARRY() {
    return this.#CARRY
  }

  get type() {
    return this.constructor.type
  }

  toJSON() {
    return {
      type: this.type,
      A: this.#A,
      B: this.#B,
      C: this.#C,
      SUM: this.#SUM,
      CARRY: this.#CARRY,
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
