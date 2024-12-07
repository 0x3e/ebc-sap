import {test as describe} from "uvu"
import * as it from "uvu/assert"
import * as Gates from "../src/gates.js"
import * as h from "../src/helpers.js"

describe("Gate.Buffer", () => {
  /*                     *\
  *   |   A   |   Y   |   *
  *   | (0,1) | (0,1) |   *
  *   |   0   |   0   |   *
  *   |   1   |   1   |   *
  \*                     */
  const buffer = new Gates.Buffer()

  buffer.set(h.randomBit())
  it.is(buffer.type, "Gate.Buffer")
  it.instance(buffer, Gates.Buffer)
  buffer.A = false
  it.is(buffer.toString(), '{"type":"Gate.Buffer","A":false,"Q":false}')
  it.type(buffer.Q, "boolean")
  it.is(buffer.set(false), false)
  it.is(buffer.set(true), true)
  it.is(buffer.set(false), false)
})
describe("Gate.NOT", () => {
  /*                     *\
  *   |   A   |   Y   |   *
  *   | (0,1) | (0,1) |   *
  *   |   0   |   1   |   *
  *   |   1   |   0   |   *
  \*                     */
  const not = new Gates.NOT()

  not.set(h.randomBit())
  it.is(not.type, "Gate.NOT")
  it.instance(not, Gates.NOT)
  not.A = true
  it.is(not.toString(), '{"type":"Gate.NOT","A":true,"Q":false}')
  it.type(not.Q, "boolean")
  it.is(not.set(false), true)
  it.is(not.set(true), false)
})
describe("Gate.AND", () => {
  /*                               *\
  *   |   A   |    B   |    Q   |   *
  *   | (0,1) |  (0,1) |  (0,1) |   *
  *   |   0   |    0   |    0   |   *
  *   |   0   |    1   |    0   |   *
  *   |   1   |    0   |    0   |   *
  *   |   1   |    1   |    1   |   *
  \*                               */
  const and = new Gates.AND()

  and.set(h.randomBit(), h.randomBit())
  it.is(and.type, "Gate.AND")
  it.instance(and, Gates.AND)
  and.A = false
  and.B = false
  it.is(and.toString(), '{"type":"Gate.AND","A":false,"B":false,"Q":false}')
  it.type(and.Q, "boolean")
  it.is(and.set(false, false), false)
  it.is(and.set(false, true), false)
  it.is(and.set(true, false), false)
  it.is(and.set(true, true), true)
})
describe("multiple Gates.AND", () => {
  /*                 and0                     *\
  *   A -------------|&&\  Q                   *
  *                  |&& )--.                  *
  *   B -------------|&&/   |   A  and2        *
  *                         `------|&&\   Q    *
  *                  and1       B  |&& )----   *
  *            A ----|&&\  Q .-----|&&/        *
  *                  |&& )---'                 *
  *            B ----|&&/                      *
  \*                                          */
  const and = h.ArrayOf(3, () => new Gates.AND())

  and[0].sendQ(Q => and[2].setA(Q))
  and[1].sendQ(Q => and[2].setB(Q))
  and[0].set(true, true)
  and[1].set(true, true)
  it.is(and[2].Q, true)
  and[0].A = false
  it.is(and[2].Q, false)
  and[0].A = true
  it.is(and[2].Q, true)
})
describe("Gate.OR", () => {
  /*                               *\
  *   |   A   |    B   |    Q   |   *
  *   | (0,1) |  (0,1) |  (0,1) |   *
  *   |   0   |    0   |    0   |   *
  *   |   0   |    1   |    1   |   *
  *   |   1   |    0   |    1   |   *
  *   |   1   |    1   |    1   |   *
  \*                               */
  const or = new Gates.OR()

  or.set(h.randomBit(), h.randomBit())
  it.is(or.type, "Gate.OR")
  it.instance(or, Gates.OR)
  or.A = false
  or.B = true
  it.is(or.toString(), '{"type":"Gate.OR","A":false,"B":true,"Q":true}')
  it.type(or.Q, "boolean")
  it.is(or.set(false, false), false)
  it.is(or.set(false, true), true)
  it.is(or.set(true, false), true)
  it.is(or.set(true, true), true)
})
describe("multiple Gates.OR", () => {
  /*                  or0                     *\
  *   A -------------|&&\  Q                   *
  *                  |&& )--.                  *
  *   B -------------|&&/   |   A   or2        *
  *                         `------|&&\   Q    *
  *                   or1       B  |&& )----   *
  *            A ----|&&\  Q .-----|&&/        *
  *                  |&& )---'                 *
  *            B ----|&&/                      *
  \*                                          */
  const or = h.ArrayOf(3, () => new Gates.OR())

  or[0].sendQ(Q => or[2].setA(Q))
  or[1].sendQ(Q => or[2].setB(Q))
  or[0].set(true, false)
  or[1].set(false, false)
  it.is(or[2].Q, true)
  or[0].A = false
  it.is(or[2].Q, false)
  or[0].A = true
  it.is(or[2].Q, true)
})
describe.run()
