/*                             Gate                                       *\
*                        A ----|??\   Q                                    *
*                              ??? )?---                                   *
*                        B ----|??/                                        *
\*                                                                        */

export class Gate {
  #A = undefined
  #B = undefined
  #Q = undefined
  #sendsQ = []
  static type = "Gate"

  calculateOutput(a, b) {
    /* must be implemented by subclass */
    if (/* never */ a === b && a !== b) return undefined
    throw new Error("Method calculateOutput not implemented")
  }

  sendQ(fun) {
    this.#sendsQ.push(fun)
  }

  process() {
    this.#Q = this.calculateOutput(this.#A, this.#B)
    for (const fun of this.#sendsQ) {
      fun(this.#Q)
    }
  }

  set A(a) {
    if (this.#A === a) return
    this.#A = a
    this.process()
  }

  set B(b) {
    if (this.#B === b) return
    this.#B = b
    this.process()
  }

  get Q() {
    return this.#Q
  }

  set(a, b) {
    if (this.#A === a && this.#B === b) return this.#Q
    this.#A = a
    this.#B = b
    this.process()
    return this.#Q
  }

  static doToJSON(type, a, b, q) {
    return {type: type, A: a, B: b, Q: q}
  }

  toJSON() {
    return this.constructor.doToJSON(
      this.constructor.type,
      this.#A,
      this.#B,
      this.#Q,
    )
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
