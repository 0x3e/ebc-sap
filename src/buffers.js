class Buffer {
  #a = undefined
  #y = undefined

  calculate_output(a) {
    /* must be implemented by subclass */
    this.#y = a
    throw new Error('Method calculate_output not implemented')
  }

  process() {
    this.#y = this.calculate_output(this.#a)
  }

  set a(a) { this.#a = a; this.process() }
  get y() { return this.#y }

  simple(a) {
    this.a = a
    this.process()
    return this.y
  }

  toJson() { return { a: this.#a, y: this.y } }
  toString() { return JSON.stringify(this.toJson()) }
}

export class Wire extends Buffer {
  calculate_output (a) { return a }
}
export class NOT extends Buffer {
  calculate_output (a) { return !a }
}
