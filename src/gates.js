const gate = function (processFun) {
  let _a = null
  let _b = null
  let _out = null
  const process = () => {
    _out = processFun(_a, _b)
  }
  const setA = a => { _a = a; process() }
  const setB = b => { _b = b; process() }
  const set = (a, b) => { [_a, _b] = [a, b]; process() }
  const output = () => _out
  const getY = output

  const simple = (a, b) => {
    set(a, b)
    process()
    return output()
  }

  return { setA, setB, getY, set, process, output, simple }
}

const AND = function () { return gate((a, b) => a && b) }
export { AND }
