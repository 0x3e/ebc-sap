/* global console */
const failHard = false
const runFun = (desc, fun, expectedResult) => {
  let result = fun()
  let pass = false

  if (expectedResult === null ||
      expectedResult === undefined) {
    // nothing
  } else if (expectedResult.constructor === Array ||
      expectedResult.constructor === Object) {
    expectedResult = JSON.stringify(expectedResult)
    result = JSON.stringify(result)
  }

  if (expectedResult === 'truthy' && result) {
    pass = true
  } else if (expectedResult === 'falsy' && !result) {
    pass = true
  } else if (expectedResult === 'undefined' && result === undefined) {
    pass = true
  } else if (expectedResult === result) {
    pass = true
  }
  if (pass) {
    console.log('ok - ' + desc)
  } else {
    console.log('not ok - ' + desc)
    console.log('  expected: ' + expectedResult)
    console.log('  got: ' + result)
  }
}
const test = (desc, fun, expectedResult = true) => {
  if (failHard) {
    runFun(desc, fun, expectedResult)
  } else {
    try {
      runFun(desc, fun, expectedResult)
    } catch (err) {
      console.log('not ok - ' + desc)
      console.log('  expected: ' + expectedResult)
      console.log('  got: CATCH')
      console.log(err)
    }
  }
}
const matches = (desc, fun, expectedResult) => test(desc, fun, expectedResult)
const isTrue = (desc, fun) => test(desc, fun, true)
const isFalse = (desc, fun) => test(desc, fun, false)
const isTruthy = (desc, fun) => test(desc, fun, 'truthy')
const isFalsy = (desc, fun) => test(desc, fun, 'falsy')
const isNull = (desc, fun) => test(desc, fun, null)
const isUndefined = (desc, fun) => test(desc, fun, 'undefined')
const matchObject = (desc, fun, expectedResult) => test(desc, fun, expectedResult)
export { matches, isTrue, isFalse, isTruthy, isFalsy, isNull, isUndefined, matchObject }
