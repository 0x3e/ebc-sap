const {Gate} = await import("./gates.js")

export class Buffer extends Gate {
  static type = "Buffer"
  static doToJSON(type, a, b, q) {
    return {type: type, A: a, Q: q}
  }
}

export class Wire extends Buffer {
  static type = "Buffer.Wire"
  calculateOutput(a) {
    return a
  }
}

export class NOT extends Buffer {
  static type = "Buffer.NOT"
  calculateOutput(a) {
    return !a
  }
}
