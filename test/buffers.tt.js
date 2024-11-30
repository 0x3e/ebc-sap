const t = await import('./ttester.js')
const Buffers = await import('../src/buffers.js')
const not = Buffers.NOT().simple

t.isTruthy('NOT', () => 'header')
t.isTruthy('.    |   A   |   Y   |', () => 'header')
t.matches( '.    | (0,1) | (0,1) |', () => (typeof (not(true))), 'boolean')
t.isTrue(  '.    |   0   |   1   |', () => not(false))
t.isFalse( '.    |   1   |   0   |', () => not(true))

const wire = Buffers.Wire().simple

t.isTruthy('Wire', () => 'header')
t.isTruthy('.    |   A   |   Y   |', () => 'header')
t.matches( '.    | (0,1) | (0,1) |', () => (typeof (not(true))), 'boolean')
t.isFalse( '.    |   0   |   0   |', () => wire(false))
t.isTrue(  '.    |   1   |   1   |', () => wire(true))
