import * as h from "../helpers.mjs"
export class BitsDisplay {
  #D = undefined

  #on = "●"
  #off = "○"

  #containers = new Set()
  #watch = undefined
  #watch_sub = undefined

  set watch(w) {
    if (this.#watch === w) return
    this.#watch = w
    this.#watch_sub = w.sub((it = w.type) => this.update(it))
    this.update(w.type)
  }

  update(it) {
    this.asJSON = this.#watch.toJSON()
    for (const con of this.#containers) {
      con.querySelector(".reg").textContent = this.D
    }
  }

  add_container(con) {
    if (!this.#containers.has(con)) {
      this.#containers.add(con)
      con.innerHTML = this.html()
    }
  }

  remove_container(con) {
    if (this.#containers.has(con)) {
      this.#containers.delete(con)
      con.innerHTML = ""
    }
  }

  txt() {
    return `\
${this.D}`
  }

  html() {
    return `\
<div class=reg>${this.D}</div>`
  }

  set D(d) {
    if (d === undefined) return
    this.#D = d
  }

  get D() {
    if (this.#D === undefined) return ""
    return this.#D.map(d => (d ? this.#on : this.#off)).join(" ")
  }

  set asJSON(json) {
    this.#D = json.Q
  }
}
