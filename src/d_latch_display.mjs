/*                                                                      *\
*                             DLatch                                     *
*                              _______                                   *
*                        D ----|     |---- Q                             *
*                              |     |                                   *
*                       EN ----|     |                                   *
*                              |     |                                   *
*                              |     |o--- NOT                           *
*                              -------                                   *
\*                                                                      */

export class DLatchDisplay {
  #d = "?"
  #en = "?"
  #q = "?"
  #not_q = "?"
  #dlatch = undefined
  #dlatch_sub = undefined
  #containers = new Set()

  set dlatch(dlatch) {
    if (this.#dlatch === dlatch) return
    this.#dlatch = dlatch
    this.#dlatch_sub = dlatch.sub((it = "dlatch") => this.update(it))
    this.update("dlatch")
  }

  update(it) {
    this.asJSON = this.#dlatch.toJSON()
    for (const con of this.#containers) {
      con.querySelector(".d").innerHTML = this.#d
      con.querySelector(".en").innerHTML = this.#en
      con.querySelector(".q").innerHTML = this.#q
      con.querySelector(".not_q").innerHTML = this.#not_q
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
        DLatch           
        _______          
  D -${this.#d}--|     |--${this.#q}- Q    
        |     |          
 EN -${this.#en}--|     |          
        |     |          
        |     |o-${this.#not_q}- NOTQ 
        -------          `
  }

  html() {
    return `\
<div class=dlatch>        DLatch        
        _______       
  D -<span class=d>${this.#d}</span>--|     |--<span class=q>${this.#q}</span>- Q 
        |     |       
 EN -<span class=en>${this.#en}</span>--|     |       
        |     |       
        |     |o-<span class=not_q>${this.#not_q}</span>- Ǭ 
        -------       </div>`
  }

  set D(d) {
    if (d === undefined) return
    this.#d = d ? 1 : 0
  }

  set EN(en) {
    if (en === undefined) return
    this.#en = en ? 1 : 0
  }

  set Q(q) {
    if (q === undefined) return
    this.#q = q ? 1 : 0
  }

  set NOTQ(notq) {
    if (notq === undefined) return
    this.#not_q = notq ? 1 : 0
  }

  set asJSON(json) {
    this.D = json.D
    this.EN = json.EN
    this.Q = json.Q
    this.NOTQ = json.NOTQ
  }
}
