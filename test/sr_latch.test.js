import {test as describe} from "uvu"
import * as it from "uvu/assert"
import * as h from "../src/helpers.js"
import {SRLatch} from "../src/sr_latch.js"

describe("SRLatch", () => {
  /*                               *\
  *   |   S   |    R   |    Q   |   *
  *   | (0,1) |  (0,1) |  (0,1) |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    0   |    1   |   *
  *   |   0   |    1   |    0   |   *
  *   |   0   |    0   |    0   |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    0   |    1   |   *
  *   |   0   |    1   |    0   |   *
  *   |   0   |    0   |    0   |   *
  \*                               */
  const sR = new SRLatch()

  sR.S = false
  sR.R = false
  it.is(sR.type, "SRLatch")
  it.instance(sR, SRLatch)
  it.is(
    sR.toString(),
    '{"type":"SRLatch","S":false,"R":false,"Q":false,"NOTQ":true}',
  )
  it.type(sR.Q, "boolean")
  sR.S = true
  it.is(sR.Q, true)
  sR.S = false
  it.is(sR.Q, true)
  sR.R = true
  it.is(sR.Q, false)
  sR.R = false
  it.is(sR.Q, false)
  sR.S = true
  it.is(sR.Q, true)
  sR.S = false
  it.is(sR.Q, true)
  sR.R = true
  it.is(sR.Q, false)
  sR.R = false
  it.is(sR.Q, false)
})
describe.run()
