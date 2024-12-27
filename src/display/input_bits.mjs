export class BitsInput {
  #bits = undefined
  #containers = new Set()
  #iputs = undefined
  #out = undefined
  #sendsOUT = []

  constructor(bits) {
    this.#bits = bits
  }

  sendOUT(fun) {
    this.#sendsOUT.push(fun)
  }

  add_container(con) {
    if (!this.#containers.has(con)) {
      this.#containers.add(con)
      con.innerHTML = this.html()
      this.#iputs = con.querySelectorAll(".bits_input input")
      for (const iput of this.#iputs) {
        //TODO work out which was clicked and update others to match
        iput.addEventListener("click", () => this.update())
      }
    }
  }

  update() {
    const out = []
    for (const iput of this.#iputs) out.push(!!iput.checked)
    this.#out = out
    for (const fun of this.#sendsOUT) fun(this.#out)
  }

  html() {
    let iputs = ""
    for (let i = 0; i < this.#bits; i++) iputs += `<input type="checkbox" />`

    return `\
<fieldset class=bits_input><legend>BitsInput</legend>${iputs}</fieldset>\
`
  }
}
