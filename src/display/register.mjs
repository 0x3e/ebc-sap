import * as h from "../helpers.mjs"
export class RegisterDisplay {
  #D = undefined

  #on = "●"
  #off = "○"

  #containers = new Set()
  #register = undefined
  #register_sub = undefined

  set register(r) {
    if (this.#register === r) return
    this.#register = r
    this.#register_sub = r.sub((it = "register") => this.update(it))
    this.update("register")
  }

  update(it) {
    this.asJSON = this.#register.toJSON()
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
    this.D = json.Q
  }
}
