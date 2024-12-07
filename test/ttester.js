let allGood = true
async function describe(desc, fun) {
  fun()
  if (!allGood) {
    const err = new Error()
    const err_stack = err.stack || ""
    const test_file = err_stack.split("\n").filter(line => {
      return (
        (line.match(/http/) && !line.match(/ttester/)) ||
        line.match(/at file/)
      )
    })
    console.log(`fail ${test_file.join().trim()}`)
    console.log(`fail in ${desc}`)
  }
  allGood = true
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
      allGood = false
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
        allGood = false
        console.log(`not ok - ${desc}`)
        console.log(`  expected: ${expected}`)
        console.log("  got: CATCH")
        console.log(err)
      }
    }
  }
  const matches = (desc, fun, expectedResult) =>
    test(desc, fun, expectedResult)
  const is = matches
  const isTrue = (desc, fun) => test(desc, fun, true)
  const isFalse = (desc, fun) => test(desc, fun, false)
  const isTruthy = (desc, fun) => test(desc, fun, "truthy")
  const isFalsy = (desc, fun) => test(desc, fun, "falsy")
  const isNull = (desc, fun) => test(desc, fun, null)
  const isUndefined = (desc, fun) => test(desc, fun, "undefined")
  const isType = (desc, fun, expectedResult) =>
    test(desc, () => typeof fun(), expectedResult)
  const matchObject = (desc, fun, expectedResult) =>
    test(desc, fun, expectedResult)
  const output = desc => console.log(`ok - ${desc}`)
  return {
    matches,
    is,
    isTrue,
    isFalse,
    isTruthy,
    isFalsy,
    isNull,
    isUndefined,
    isType,
    matchObject,
    output,
  }
}
const it = ttester()
export {describe, it}
