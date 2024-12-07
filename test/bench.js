import * as math from "./math.js"
import {describe, it} from "./ttester.js"

describe("sum", () => {
  it.isType("sum is a function", () => math.sum, "function")
  it.is("1+2=3", () => math.sum(1, 2), 3)
  it.is("-1+-2=-3", () => math.sum(-1, -2), -3)
  it.is("-1+1=0", () => math.sum(-1, 1), 0)
})
describe("div", () => {
  it.isType("", () => math.div, "function")
  it.is("", () => math.div(1, 2), 0.5)
  it.is("", () => math.div(-1, -2), 0.5)
  it.is("", () => math.div(-1, 1), -1)
})

describe("mod", () => {
  it.isType("", () => math.mod, "function")
  it.is("", () => math.mod(1, 2), 1)
  it.is("", () => math.mod(-3, -2), -1)
  it.is("", () => math.mod(7, 4), 3)
})
