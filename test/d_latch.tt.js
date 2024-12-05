import {DLatch} from "../src/d_latch.js"
import * as h from "../src/helpers.js"
import {describe, it} from "./ttester.js"

//biome-ignore format: text alignment
describe("DLatch", () => {
  const dL = new DLatch()

  dL.D = false
  dL.EN = true
  it.matches("is a DLatch", () => dL.type, "DLatch")
  it.output(dL.toString())
  it.output( ".    |   D   |   EN   |    Q   |")
  it.matches(".    | (0,1) |  (0,1) |  (0,1) |", () => typeof dL.Q, "boolean")
  dL.D = true
  it.isTrue( ".    |   1   |    1   |    1   |", () => dL.Q)
  dL.EN = false
  it.isTrue( ".    |   1   |    0   |    1   |", () => dL.Q)
  dL.D = false
  it.isTrue( ".    |   0   |    0   |    1   |", () => dL.Q)
  dL.D = true
  it.isTrue( ".    |   1   |    0   |    1   |", () => dL.Q)
  dL.D = false
  dL.EN = true
  it.isFalse(".    |   0   |    1   |    0   |", () => dL.Q)
  dL.EN = false
  it.isFalse(".    |   0   |    0   |    0   |", () => dL.Q)
  dL.D = true
  it.isFalse(".    |   1   |    0   |    0   |", () => dL.Q)
  dL.EN = true
  it.isTrue( ".    |   1   |    1   |    1   |", () => dL.Q)
  dL.D = false
  dL.EN = false
  it.isFalse(".    |   0   |    0   |    0   |", () => dL.Q)
})
