import {describe, eq, it, ok} from "../lib/test.mjs"
import {ANDEdgeDetector} from "../src/and_edge_detector.js"
import * as h from "../src/helpers.js"

describe("ANDEdgeDetector", () => {
  it("ANDEdgeDetector", () => {
    const andED = new ANDEdgeDetector()

    andED.setA(h.randomBit())
    eq(andED.type, "ANDEdgeDetector")
    andED.A = false
    eq(andED.toString(), '{"type":"ANDEdgeDetector","A":false,"Q":false}')
    eq(typeof andED.Q, "boolean")
    andED.A = false
    eq(andED.Q, false)
    let hit = false
    andED.sendQ(Q => {
      if (!hit) hit = Q
    })
    andED.A = true
    eq(hit, true, "will be hit")
    eq(andED.Q, false)
  })
})
