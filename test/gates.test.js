import {describe, eq, it, ok} from "../lib/test.mjs"
import * as Gates from "../src/gates.mjs"
import * as h from "../src/helpers.mjs"

describe("Gate", () => {
  it("Gate.Buffer", () => {
    /*                     *\
    *   |   A   |   Y   |   *
    *   | (0,1) | (0,1) |   *
    *   |   0   |   0   |   *
    *   |   1   |   1   |   *
    \*                     */
    const buffer = new Gates.Buffer()

    buffer.set(h.randomBit())
    eq(buffer.type, "Gate.Buffer")
    buffer.A = false
    eq(buffer.toString(), '{"type":"Gate.Buffer","A":false,"Q":false}')
    eq(typeof buffer.Q, "boolean")
    eq(buffer.set(false), false)
    eq(buffer.set(true), true)
    eq(buffer.set(false), false)
  })
  it("Gate.NOT", () => {
    /*                     *\
    *   |   A   |   Y   |   *
    *   | (0,1) | (0,1) |   *
    *   |   0   |   1   |   *
    *   |   1   |   0   |   *
    \*                     */
    const not = new Gates.NOT()

    not.set(h.randomBit())
    eq(not.type, "Gate.NOT")
    not.A = true
    eq(not.toString(), '{"type":"Gate.NOT","A":true,"Q":false}')
    eq(typeof not.Q, "boolean")
    eq(not.set(false), true)
    eq(not.set(true), false)
  })
  it("Gate.TriState", () => {
    /*                               *\
    *   TriState                      *
    *   |   A   |    B   |    Q   |   *
    *   | (0,1) |  (0,1) |  (0,1) |   *
    *   |   0   |    0   |    U   |   *
    *   |   0   |    1   |    1   |   *
    *   |   1   |    0   |    U   |   *
    *   |   1   |    1   |    1   |   *
    \*                               */
    const tri = new Gates.TriState()

    tri.set(h.randomBit(), h.randomBit())
    eq(tri.type, "Gate.TriState")
    tri.A = false
    tri.B = false
    eq(tri.toString(), '{"type":"Gate.TriState","A":false,"B":false}')
    eq(typeof tri.Q, "undefined")
    eq(tri.set(false, false), undefined)
    eq(typeof tri.Q, "undefined")
    eq(tri.set(false, false), undefined)
    eq(typeof tri.Q, "undefined")
    eq(tri.set(false, true), false)
    eq(typeof tri.Q, "boolean")
    eq(tri.set(true, false), undefined)
    eq(typeof tri.Q, "undefined")
    eq(tri.set(true, true), true)
    eq(typeof tri.Q, "boolean")
  })
  it("Gate.AND", () => {
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
    eq(and.type, "Gate.AND")
    and.A = false
    and.B = false
    eq(and.toString(), '{"type":"Gate.AND","A":false,"B":false,"Q":false}')
    eq(typeof and.Q, "boolean")
    eq(and.set(false, false), false)
    eq(and.set(false, true), false)
    eq(and.set(true, false), false)
    eq(and.set(true, true), true)
  })
  it("Gates.AND", () => {
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
    eq(and[2].Q, true)
    and[0].A = false
    eq(and[2].Q, false)
    and[0].A = true
    eq(and[2].Q, true)
  })
  it("Gate.OR", () => {
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
    eq(or.type, "Gate.OR")
    or.A = false
    or.B = true
    eq(or.toString(), '{"type":"Gate.OR","A":false,"B":true,"Q":true}')
    eq(typeof or.Q, "boolean")
    eq(or.set(false, false), false)
    eq(or.set(false, true), true)
    eq(or.set(true, false), true)
    eq(or.set(true, true), true)
  })
  it("Gates.OR", () => {
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
    eq(or[2].Q, true)
    or[0].A = false
    eq(or[2].Q, false)
    or[0].A = true
    eq(or[2].Q, true)
  })
})
