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
  #wr = "?"
  #en = "?"
  #addrN = "?"
  #inB = "??"
  #outB = "??"
  #fourBitAddressable = undefined
  #four_ba_sub = undefined
  #containers = new Set()

  set fourBitAddressable(four_ba) {
    if (this.#fourBitAddressable === four_ba) return
    this.#fourBitAddressable = four_ba
    this.#four_ba_sub = fourBitAddressable.sub((it = "four_ba") =>
      this.update(it),
    )
    this.update("four_ba")
  }

  update(it) {
    this.asJSON = this.#fourBitAddressable.toJSON()
    for (const con of this.#containers) {
      con.querySelector(".wr").textContent = this.#wr
      con.querySelector(".en").textContent = this.#en
      con.querySelector(".addrN").textContent = this.#addrN
      con.querySelector(".inB").textContent = this.#inB
      con.querySelector(".outB").textContent = this.#outB
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
   WR -${this.#wr}--|     |-${this.#outB}- OUT 
          |     |         
   EN -${this.#en}--|     |         
          |     |         
 ADDR -${this.#addrN}--|     |         
          |     |         
   IN -${this.#inB}-|     |         
          -------         `
  }

  html() {
    return `\
        -------       </div>`
  }

  set WR(wr) {
    if (wr === undefined) return
    this.#wr = wr ? 1 : 0
  }

  set EN(en) {
    if (en === undefined) return
    this.#en = en ? 1 : 0
  }

  set ADDRN(n) {
    if (n === undefined) return
    this.#addrN = h.bitsToHex(n)
  }

  set INB(B) {
    if (B === undefined) return
    this.#inB = h.bitsToHex(B)
  }

  set OUTB(B) {
    if (B === undefined) return
    this.#outB = h.bitsToHex(B)
  }

  set asJSON(json) {
    this.WR = json.WR
    this.EN = json.EN
    this.ADDRN = json.ADDR
    this.INB = json.IN
    this.OUTB = json.OUT
  }
}
