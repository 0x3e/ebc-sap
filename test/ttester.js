const isBrowser = typeof window !== "undefined"
const process = {exitCode: 0}

if (!isBrowser) {
  const process = await import("node:process")
}

async function describe(desc, fun) {
  fun()
}
function ttester() {
  const failHard = false
  function runFun(desc, fun, expectedResult) {
    let result = fun()
    let pass = false
    let expected = expectedResult

    if (expectedResult === null || expectedResult === undefined) {
      expected = expectedResult
    } else if (
      expectedResult.constructor === Array ||
      expectedResult.constructor === Object
    ) {
      expected = JSON.stringify(expectedResult)
      result = JSON.stringify(result)
    }

    if (expected === "truthy" && result) {
      pass = true
    } else if (expected === "falsy" && !result) {
      pass = true
    } else if (expected === "undefined" && result === undefined) {
      pass = true
    } else if (expected === result) {
      pass = true
    }

    if (pass) {
      console.log(`ok - ${desc}`)
    } else {
      process.exitCode = 222
      console.log(`not ok - ${desc}`)
      console.log(`  expected: ${expected}`)
      console.log(`  got: ${result}`)
    }
  }
  function test(desc, fun, expectedResult) {
    const expected = expectedResult
    if (failHard) {
      runFun(desc, fun, expected)
    } else {
      try {
        runFun(desc, fun, expected)
      } catch (err) {
        process.exitCode = 222
        console.log(`not ok - ${desc}`)
        console.log(`  expected: ${expected}`)
        console.log("  got: CATCH")
        console.log(err)
      }
    }
  }
  const matches = (desc, fun, expectedResult) =>
    test(desc, fun, expectedResult)
  const isTrue = (desc, fun) => test(desc, fun, true)
  const isFalse = (desc, fun) => test(desc, fun, false)
  const isTruthy = (desc, fun) => test(desc, fun, "truthy")
  const isFalsy = (desc, fun) => test(desc, fun, "falsy")
  const isNull = (desc, fun) => test(desc, fun, null)
  const isUndefined = (desc, fun) => test(desc, fun, "undefined")
  const matchObject = (desc, fun, expectedResult) =>
    test(desc, fun, expectedResult)
  const output = desc => console.log(`ok - ${desc}`)
  return {
    matches,
    isTrue,
    isFalse,
    isTruthy,
    isFalsy,
    isNull,
    isUndefined,
    matchObject,
    output,
  }
}
const it = ttester()
export {describe, it}
