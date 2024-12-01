const t = await import('./ttester.js')

t.isTruthy('true is truthy', () => true)
t.isFalsy('0 is falsy', () => 0)
t.isFalsy('"" is falsy', () => '')
t.isFalse('false is false', () => false)
t.isTrue('true is true', () => true)
t.isFalse('"true" is not true', () => 'true' === true)
t.isNull('null is null', () => null)
t.isUndefined('undefined is undefined', () => undefined)
t.matchObject('ob testing one 2', () => ({ one: 2 }), { one: 2 })
t.matches('false is boolean' , () => typeof(false), 'boolean')
t.matches('true is boolean' , () => typeof(true), 'boolean')
