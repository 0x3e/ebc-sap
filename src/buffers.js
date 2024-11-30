const buffer = function (processFun) {
  let _a = undefined
  let _y = undefined
  const process = () => {
    _y = processFun(_a)
  }
  const setA = a => { _a = a; process() }
  const set = setA
  const getY = () => _y
  const output = getY

  const simple = a => {
    set(a)
    process()
    return output()
  }
  const toJson = () => ({a: _a, y: _y })
  const toString = () => JSON.stringify(toJson())

  return { setA, getY, set, process, output, simple, toJson, toString }
}

const Wire = function () { return buffer( a => a ) }
const NOT = function () { return buffer( a => !a ) }
export { Wire, NOT }
