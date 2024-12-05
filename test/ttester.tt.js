import {describe, it} from "./ttester.js"

describe("ttester", () => {
  it.isTruthy("true is truthy", () => true)
  it.isTruthy('"true" is truthy', () => "true")
  it.isFalsy("0 is falsy", () => 0)
  it.isFalsy('"" is falsy', () => "")
  it.isFalse("false is false", () => false)
  it.isTrue("true is true", () => true)
  it.isFalse('"true" is not true', () => true === "true")
  it.isFalse('"true" is not false', () => false === "true")
  it.isNull("null is null", () => null)
  it.isUndefined("undefined is undefined", () => undefined)
  it.matchObject("ob testing one 2", () => ({one: 2}), {one: 2})
  it.matches("false is boolean", () => typeof false, "boolean")
  it.matches("true is boolean", () => typeof true, "boolean")
})
