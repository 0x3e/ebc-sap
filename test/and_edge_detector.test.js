import {test as describe} from "uvu"
import * as it from "uvu/assert"
import {ANDEdgeDetector} from "../src/and_edge_detector.js"
import * as h from "../src/helpers.js"

describe("ANDEdgeDetector", () => {
  const andED = new ANDEdgeDetector()

  andED.setA(h.randomBit())
  it.is(andED.type, "ANDEdgeDetector")
  it.instance(andED, ANDEdgeDetector)
  andED.A = false
  it.is(andED.toString(), '{"type":"ANDEdgeDetector","A":false,"Q":false}')
  it.type(andED.Q, "boolean")
  andED.A = false
  it.is(andED.Q, false)
  let hit = false
  andED.sendQ( Q => { if(!hit) hit = Q })
  andED.A = true
  it.is(hit, true, "will be hit")
  it.is(andED.Q, false)
})
describe.run()
