export class PubSub {
  #subs = new WeakSet()
  #subList = new Set()

  sub(fun) {
    if (!this.#subs.has(fun)) {
      this.#subs.add(fun)
      this.#subList.add(new WeakRef(fun))
    }

    return fun
  }

  pub() {
    for (const sub of this.#subList) {
      const fun = sub.deref()
      fun ? fun() : this.#subList.delete(sub)
    }
  }
}
