/*                                                                        *\
*                             DLatch                                       *
*                              _______                                     *
*                        D ----|     |---- Q                               *
*                              |     |                                     *
*                       EN ----|     |                                     *
*                              |     |                                     *
*                              |     |o--- NOT                             *
*                              -------                                     *
\*                                                                        */

export class DLatchDisplay {
  #d = "?"
  #en = "?"
  #q = "?"
  #not_q = "?"

  txt = () => `\
        DLatch           
        _______          
  D -${this.#d}--|     |--${this.#q}- Q    
        |     |          
 EN -${this.#en}--|     |          
        |     |          
        |     |o-${this.#not_q}- NOTQ 
        -------          `

  html = () => `\
<div class=dlatch>        DLatch           
        _______          
  D -<span class=d>${this.#d}</span>--|     |--<span class=q>${this.#q}</span>- Q    
        |     |          
 EN -<span class=en>${this.#en}</span>--|     |          
        |     |          
        |     |o-<span class=notq>${this.#not_q}</span>- Ǭ 
        -------          </div>`

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

  set asJSON(json) {
    this.D = json.D
    this.EN = json.EN
    this.Q = json.Q
    this.#not_q = json.NOTQ
  }
}
