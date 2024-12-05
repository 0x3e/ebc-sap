const t = await import("./ttester.js")
const {Clock} = await import("../src/clock.js")
const c = {}

//t.isTruthy('create', () => (c = Clock()))
//t.isTrue('output', () => (c.output() === true) || (c.output() === false))
