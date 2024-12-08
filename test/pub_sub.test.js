import {test as describe} from "uvu"
import * as it from "uvu/assert"
import {PubSub} from "../src/pub_sub.js"

const pubSub = new PubSub()

describe("PubSub", () => {
  let hit = 0
  let hitIt = () => {
    hit += 1
  }
  pubSub.sub(hitIt)
  it.is(hit, 0, "will not be hit yet")
  pubSub.pub()
  it.is(hit, 1, "will be hit now")
  pubSub.pub()
  it.is(hit, 2, "will be hit now")
  //hitIt = undefined
  hitIt = undefined
  hit = null
  pubSub.pub()
  it.is(hit, 1, "still hit now")
})

describe("PubSub second scope", () => {
  pubSub.pub() // will not throw errors
  it.ok("made it here")
})
describe.run()
