class Gate {
  #a = undefined
  #b = undefined
  #y = undefined

  calculate_output(a, b) {
    /* must be implemented by subclass */
    this.#y = a && b
    throw new Error('Method calculate_output not implemented')
  }

  process() {
    this.#y = this.calculate_output(this.#a, this.#b)
  }

  set a(a) { this.#a = a; this.process() }
  set b(b) { this.#b = b; this.process() }
  get y() { return this.#y }

  simple(a, b) {
    this.a = a
    this.b = b
    this.process()
    return this.y
  }

  toJson() { return { a: this.#a, b: this.#b, y: this.y } }
  toString() { return JSON.stringify(this.toJson()) }
}

export class AND extends Gate {
  calculate_output(a, b) { return a && b }
}
