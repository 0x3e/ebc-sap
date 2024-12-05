import * as Gates from "../src/gates.js"
import * as h from "../src/helpers.js"
//import {describe, it} from "node:test"
import {describe, it} from "./ttester.js"

//biome-ignore format: text alignment
describe("Gates.Buffer", () => {
  const buffer = new Gates.Buffer()

  buffer.set(h.randomBit())
  it.matches("is a Gate.Buffer", () => buffer.type, "Gate.Buffer")
  it.output(buffer.toString())
  it.output( ".    |   A   |   Y   |")
  it.matches(".    | (0,1) | (0,1) |", () => typeof buffer.Q, "boolean")
  it.isFalse(".    |   0   |   0   |", () => buffer.set(false))
  it.isTrue( ".    |   1   |   1   |", () => buffer.set(true ))
})

//biome-ignore format: text alignment
describe("Gates.NOT", () => {
  const not = new Gates.NOT()

  not.set(h.randomBit())
  it.matches("is a Gate.NOT", () => not.type, "Gate.NOT")
  it.output(not.toString())
  it.output( ".    |   A   |   Y   |")
  it.matches(".    | (0,1) | (0,1) |", () => typeof not.Q, "boolean")
  it.isTrue( ".    |   0   |   1   |", () => not.set(false))
  it.isFalse(".    |   1   |   0   |", () => not.set(true ))
})
//biome-ignore format: text alignment
describe("Gates.AND", () => {
  const and = new Gates.AND()

  and.set(h.randomBit(), h.randomBit())
  it.matches("is a Gate.AND", () => and.type, "Gate.AND")
  it.output(and.toString())
  it.output( ".    |   A   |    B   |    Q   |")
  it.matches(".    | (0,1) |  (0,1) |  (0,1) |", () => typeof and.Q, "boolean")
  it.isFalse(".    |   0   |    0   |    0   |", () => and.set(false, false))
  it.isFalse(".    |   0   |    1   |    0   |", () => and.set(false, true ))
  it.isFalse(".    |   1   |    0   |    0   |", () => and.set( true, false))
  it.isTrue( ".    |   1   |    1   |    1   |", () => and.set( true, true ))
})
/*                               and0                                     *\
*                 A -------------|&&\  Q                                   *
*                                |&& )--.                                  *
*                 B -------------|&&/   |   A  and2                        *
*                                       `------|&&\   Q                    *
*                                and1       B  |&& )----                   *
*                          A ----|&&\  Q .-----|&&/                        *
*                                |&& )---'                                 *
*                          B ----|&&/                                      *
\*                                                                        */
//biome-ignore format: text alignment
describe("multiple Gates.AND", () => {
  const and = h.ArrayOf(3, () => new Gates.AND())

  and[0].sendQ(Q => and[2].setA(Q))
  and[1].sendQ(Q => and[2].setB(Q))
  and[0].set(true, true)
  and[1].set(true, true)
  it.isTrue( "joined ands true" , () => and[2].Q)
  and[0].A = false
  it.isFalse("joined ands false", () => and[2].Q)
  and[0].A = true
  it.isTrue( "joined ands true" , () => and[2].Q)
})
//biome-ignore format: text alignment
describe("Gates.OR", () => {
  const or = new Gates.OR()

  or.set(h.randomBit(), h.randomBit())
  it.matches("is a Gate.OR", () => or.type, "Gate.OR")
  it.output(or.toString())
  it.output( ".    |   A   |    B   |    Q   |")
  it.matches(".    | (0,1) |  (0,1) |  (0,1) |", () => typeof or.Q, "boolean")
  it.isFalse(".    |   0   |    0   |    0   |", () => or.set(false, false))
  it.isTrue( ".    |   0   |    1   |    1   |", () => or.set(false, true ))
  it.isTrue( ".    |   1   |    0   |    1   |", () => or.set( true, false))
  it.isTrue( ".    |   1   |    1   |    1   |", () => or.set( true, true ))
})
/*                                or0                                     *\
*                 A -------------|&&\  Q                                   *
*                                |&& )--.                                  *
*                 B -------------|&&/   |   A   or2                        *
*                                       `------|&&\   Q                    *
*                                 or1       B  |&& )----                   *
*                          A ----|&&\  Q .-----|&&/                        *
*                                |&& )---'                                 *
*                          B ----|&&/                                      *
\*                                                                        */
//biome-ignore format: text alignment
describe("multiple Gates.OR", () => {
  const or = h.ArrayOf(3, () => new Gates.OR())

  or[0].sendQ(Q => or[2].setA(Q))
  or[1].sendQ(Q => or[2].setB(Q))
  or[0].set( true, false)
  or[1].set(false, false)
  it.isTrue( "joined ors true",  () => or[2].Q)
  or[0].A = false
  it.isFalse("joined ors false", () => or[2].Q)
  or[0].A = true
  it.isTrue( "joined ors true",  () => or[2].Q)
})
