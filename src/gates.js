const gate = function (type, processFun) {
  let _a = undefined
  let _b = undefined
  let _y = undefined
  const process = () => {
    _y = processFun(_a, _b)
  }
  const setA = a => { _a = a; process() }
  const setB = b => { _b = b; process() }
  const set = (a, b) => { [_a, _b] = [a, b]; process() }
  const getY = () => _y
  const output = getY

  const simple = (a, b) => {
    set(a, b)
    process()
    return output()
  }
  const toJson = () => ({type: type, a: _a, b: _b, y: _y })
  const toString = () => JSON.stringify(toJson())

  return { setA, setB, getY, set, process, output, simple, toJson, toString }
}

const AND = function () { return gate('gate.AND', (a, b) => a && b) }
export { AND }
