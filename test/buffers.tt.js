const t = await import('./ttester.js')
const Buffers = await import('../src/buffers.js')
const i_not = new Buffers.NOT()
const not = a => i_not.simple(a)

t.isTruthy('NOT', () => 'header')
t.isTruthy('.    |   A   |   Y   |', () => 'header')
t.matches( '.    | (0,1) | (0,1) |', () => (typeof (not(true))), 'boolean')
t.isTrue(  '.    |   0   |   1   |', () => not(false))
t.isFalse( '.    |   1   |   0   |', () => not(true))

const i_wire = new Buffers.Wire()
const wire = a => i_wire.simple(a)

t.isTruthy('Wire', () => 'header')
t.isTruthy('.    |   A   |   Y   |', () => 'header')
t.matches( '.    | (0,1) | (0,1) |', () => (typeof (not(true))), 'boolean')
t.isFalse( '.    |   0   |   0   |', () => wire(false))
t.isTrue(  '.    |   1   |   1   |', () => wire(true))
