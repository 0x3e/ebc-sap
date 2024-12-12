import {describe, eq, it, ok} from "../lib/test.mjs"
import {PubSub} from "../src/pub_sub.mjs"

describe("PubSub", () => {
  const pubSub = new PubSub()

  it("PubSub", () => {
    let hit = 0
    let hitIt = () => {
      hit += 1
    }
    pubSub.sub(hitIt)
    eq(hit, 0, "will not be hit yet")
    pubSub.pub()
    eq(hit, 1, "will be hit now")
    pubSub.pub()
    eq(hit, 2, "will be hit now")
    //hitIt = undefined
    hitIt = undefined
    hit = null
    pubSub.pub()
    eq(hit, 1, "still hit now")
  })

  it("PubSub second scope", () => {
    pubSub.pub() // will not throw errors
    eq(true, true)
  })
})
