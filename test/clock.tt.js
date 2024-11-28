const { Ttester } = await import('./ttester.js')
const t = Ttester(true)
const { Clock } = await import('../src/clock.js')
let c = {}

t.isTruthy('create', () => (c = Clock()), 'truthy')
t.isTrue('output', () => (c.output() === true) || (c.output() === false))
