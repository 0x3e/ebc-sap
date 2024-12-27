/*                                                                      *\
*                        FourBitAddressable                              *
*                              _______                                   *
*                       WR ----|     |---- OUT                           *
*                              |     |                                   *
*                       EN ----|     |                                   *
*                              |     |                                   *
*                     ADDR ----|     |                                   *
*                              |     |                                   *
*                       IN ----|     |                                   *
*                              -------                                   *
\*                                                                      */
import * as h from "./helpers.mjs"

export class FourBitAddressableDisplay {
  #wr = undefined
  #en = undefined
  #addrN = undefined
  #inB = undefined
  #outB = undefined
  #fourBitAddressable = undefined
  #four_ba_sub = undefined
  #containers = new Set()

  set fourBitAddressable(fba) {
    if (this.#fourBitAddressable === fba) return
    this.#fourBitAddressable = fba
    this.#four_ba_sub = fba.sub((it = "fourBitAddressable") =>
      this.update(it),
    )
    this.update("fourBitAddressable")
  }

  update(it) {
    this.asJSON = this.#fourBitAddressable.toJSON()
    for (const con of this.#containers) {
      con.querySelector(".wr").textContent = this.WR
      con.querySelector(".en").textContent = this.EN
      con.querySelector(".addr").textContent = this.ADDR
      con.querySelector(".in").textContent = this.IN
      con.querySelector(".out").textContent = this.OUT
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
    FourBitAddressable    
          _______         
   WR -${this.WR}--|     |-${this.OUT}- OUT 
          |     |         
   EN -${this.EN}--|     |         
          |     |         
 ADDR -${this.ADDR}--|     |         
          |     |         
   IN -${this.IN}-|     |         
          -------         `
  }

  html() {
    return `\
    FourBitAddressable    
          _______         
   WR -<span class=wr></span>--|     |-<span class=out></span>- OUT 
          |     |         
   EN -<span class=en></span>--|     |         
          |     |         
 ADDR -<span class=addr></span>--|     |         
          |     |         
   IN -<span class=in></span>-|     |         
          -------         `
  }

  set WR(wr) {
    if (wr === undefined) return
    this.#wr = wr
  }

  get WR() {
    if (this.#wr === undefined) return "?"
    return this.#wr ? 1 : 0
  }

  set EN(en) {
    if (en === undefined) return
    this.#en = en
  }

  get EN() {
    if (this.#en === undefined) return "?"
    return this.#en ? 1 : 0
  }

  set ADDR(n) {
    if (n === undefined) return
    this.#addrN = n
  }

  get ADDR() {
    return h.nibbleToHex(this.#addrN)
  }

  set IN(B) {
    if (B === undefined) return
    this.#inB = B
  }

  get IN() {
    return h.byteToHex(this.#inB)
  }

  set OUT(B) {
    if (B === undefined) return
    this.#outB = B
  }

  get OUT() {
    return h.byteToHex(this.#outB)
  }

  set asJSON(json) {
    this.WR = json.WR
    this.EN = json.EN
    this.ADDR = json.ADDR
    this.IN = json.IN
    this.OUT = json.OUT
  }
}

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
