import * as h from "../src/helpers.js"
import {SRLatch} from "../src/sr_latch.js"
import {describe, it} from "./ttester.js"

//biome-ignore format: text alignment
describe("SRLatch", () => {
  const sR = new SRLatch()

  sR.S = false
  sR.R = false
  it.matches("is a SRLatch", () => sR.type, "SRLatch")
  it.output(sR.toString())
  it.output( ".    |   S   |    R   |    Q   |")
  it.matches(".    | (0,1) |  (0,1) |  (0,1) |", () => typeof sR.Q, "boolean")
  sR.S = true
  it.isTrue( ".    |   1   |    0   |    1   |", () => sR.Q)
  sR.S = false
  it.isTrue( ".    |   0   |    0   |    1   |", () => sR.Q)
  sR.R = true
  it.isFalse(".    |   0   |    1   |    0   |", () => sR.Q)
  sR.R = false
  it.isFalse(".    |   0   |    0   |    0   |", () => sR.Q)
  sR.S = true
  it.isTrue( ".    |   1   |    0   |    1   |", () => sR.Q)
  sR.S = false
  it.isTrue( ".    |   0   |    0   |    1   |", () => sR.Q)
  sR.R = true
  it.isFalse(".    |   0   |    1   |    0   |", () => sR.Q)
  sR.R = false
  it.isFalse(".    |   0   |    0   |    0   |", () => sR.Q)
})
