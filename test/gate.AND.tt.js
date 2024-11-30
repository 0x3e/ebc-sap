const t = await import('./ttester.js')
const Gates = await import('../src/gates.js')
const and = Gates.AND().simple

t.isTruthy('.    |   A   |    B   |    Y   |', () => 'header')
t.matches('.    | (0,1) |  (0,1) |  (0,1) |', () => (typeof (and(true, false))), 'boolean')
t.isFalse('.    |   0   |    0   |    0   |', () => and(false, false))
t.isFalse('.    |   0   |    1   |    0   |', () => and(false, true))
t.isFalse('.    |   1   |    0   |    0   |', () => and(true, false))
t.isTrue('.    |   1   |    1   |    1   |', () => and(true, true))
