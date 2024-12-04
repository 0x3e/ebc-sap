const t = await import('./ttester.js')
const Gates = await import('../src/gates.js')
const h = await import('../src/helpers.js')

{
  const buffer = new Gates.Buffer()

  buffer.set(h.randomBit())
  t.output(buffer.toString())
  t.output( ".    |   A   |   Y   |")
  t.matches(".    | (0,1) | (0,1) |", () => typeof buffer.Q, "boolean")
  t.isFalse(".    |   0   |   0   |", () => buffer.set(false))
  t.isTrue( ".    |   1   |   1   |", () => buffer.set(true))
}
{
  const not = new Gates.NOT()

  not.set(h.randomBit())
  t.output(not.toString())
  t.output( ".    |   A   |   Y   |")
  t.matches(".    | (0,1) | (0,1) |", () => typeof not.Q, "boolean")
  t.isTrue( ".    |   0   |   1   |", () => not.set(false))
  t.isFalse(".    |   1   |   0   |", () => not.set(true))
}
{
  const and = new Gates.AND()

  and.set(h.randomBit(), h.randomBit())
  t.output(and.toString())
  t.output(  '.    |   A   |    B   |    Q   |')
  t.matches( '.    | (0,1) |  (0,1) |  (0,1) |',
    () => typeof and.Q, 'boolean')
  t.isFalse( '.    |   0   |    0   |    0   |', () => and.set(false, false))
  t.isFalse( '.    |   0   |    1   |    0   |', () => and.set(false, true ))
  t.isFalse( '.    |   1   |    0   |    0   |', () => and.set(true , false))
  t.isTrue(  '.    |   1   |    1   |    1   |', () => and.set(true , true ))
}{
/*                               and0                                     *\
*                 A -------------|&&\  Q                                   *
*                                |&& )--.                                  *
*                 B -------------|&&/   |   A  and2                        *
*                                       `------|&&\   Q                    *
*                                and1       B  |&& )----                   *
*                          A ----|&&\  Q .-----|&&/                        *
*                                |&& )---'                                 *
*                          B ----|&&/                                      *
\*                                                                        */

  const and = h.ArrayOf(3, () => new Gates.AND())

  and[0].sendQ( Q => and[2].A = Q )
  and[1].sendQ( Q => and[2].B = Q )
  and[0].set(true, true)
  and[1].set(true, true)
  t.isTrue( 'joined ands true', () => and[2].Q)
  and[0].A = false
  t.isFalse('joined ands false', () => and[2].Q)
  and[0].A = true
  t.isTrue( 'joined ands true', () => and[2].Q)
}{
  const or = new Gates.OR()

  or.set(h.randomBit(), h.randomBit())
  t.output(or.toString())
  t.output(  '.    |   A   |    B   |    Q   |')
  t.matches( '.    | (0,1) |  (0,1) |  (0,1) |',
    () => typeof or.Q, 'boolean')
  t.isFalse( '.    |   0   |    0   |    0   |', () => or.set(false, false))
  t.isTrue(  '.    |   0   |    1   |    1   |', () => or.set(false, true))
  t.isTrue(  '.    |   1   |    0   |    1   |', () => or.set(true , false))
  t.isTrue(  '.    |   1   |    1   |    1   |', () => or.set(true , true))
}{
/*                                or0                                     *\
*                 A -------------|&&\  Q                                   *
*                                |&& )--.                                  *
*                 B -------------|&&/   |   A   or2                        *
*                                       `------|&&\   Q                    *
*                                 or1       B  |&& )----                   *
*                          A ----|&&\  Q .-----|&&/                        *
*                                |&& )---'                                 *
*                          B ----|&&/                                      *
\*                                                                        */

  const or = h.ArrayOf(3, () => new Gates.OR())

  or[0].sendQ( Q => or[2].A = Q )
  or[1].sendQ( Q => or[2].B = Q )
  or[0].set(true , false)
  or[1].set(false, false)
  t.isTrue( 'joined ors true',  () => or[2].Q)
  or[0].A = false
  t.isFalse('joined ors false', () => or[2].Q)
  or[0].A = true
  t.isTrue( 'joined ors true',  () => or[2].Q)
}
