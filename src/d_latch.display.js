/*                                                                        *\
*                             DLatch                                       *
*                              _____                                       *
*                        D ----|   |---- Q                                 *
*                              |   |                                       *
*                       EN ----|   |---- NOTQ                              *
*                              -----                                       *
\*                                                                        */

export class DLatchDisplay {
  #d = "?"
  #en = "?"
  #q = "?"
  #not_q = "?"

  txt = () => `\
       DLatch          
        _____          
  D -${this.#d}--|   |--${this.#q}- Q    
        |   |          
 EN -${this.#en}--|   |--${this.#not_q}- NOTQ 
        -----          `

  set D(d) {
    this.#d = d ? 1 : 0
  }

  set EN(en) {
    this.#en = en ? 1 : 0
  }

  set Q(q) {
    this.#q = q ? 1 : 0
    this.#not_q = q ? 0 : 1
  }

  set fromJSON(json) {
    this.D = json.D
    this.EN = json.EN
    this.Q = json.Q
    this.#not_q = json.NOTQ
  }
}
