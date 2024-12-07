import {test as describe} from "uvu"
import * as it from "uvu/assert"
import {DLatch} from "../src/d_latch.js"
import * as h from "../src/helpers.js"

describe("DLatch", () => {
  /*                               *\
  *   |   D   |   EN   |    Q   |   *
  *   | (0,1) |  (0,1) |  (0,1) |   *
  *   |   1   |    1   |    1   |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    0   |    1   |   *
  *   |   1   |    0   |    1   |   *
  *   |   0   |    1   |    0   |   *
  *   |   0   |    0   |    0   |   *
  *   |   1   |    0   |    0   |   *
  *   |   1   |    1   |    1   |   *
  *   |   0   |    0   |    0   |   *
  \*                               */
  const dL = new DLatch()

  dL.D = false
  dL.EN = true
  it.instance(dL, DLatch)
  it.is(dL.type, "DLatch")
  it.is(
    dL.toString(),
    '{"type":"DLatch","D":false,"EN":true,"Q":false,"NOTQ":true}',
  )
  it.type(dL.Q, "boolean")
  dL.D = true
  it.is(dL.Q, true)
  dL.EN = false
  it.is(dL.Q, true)
  dL.D = false
  it.is(dL.Q, true)
  dL.D = true
  it.is(dL.Q, true)
  dL.D = false
  dL.EN = true
  it.is(dL.Q, false)
  dL.EN = false
  it.is(dL.Q, false)
  dL.D = true
  it.is(dL.Q, false)
  dL.EN = true
  it.is(dL.Q, true)
  dL.D = false
  dL.EN = false
  it.is(dL.Q, false)
})
describe.run()
