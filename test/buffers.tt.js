const t = await import("./ttester.js")
const Buffers = await import("../src/buffers.js")
const h = await import("../src/helpers.js")
{
  const not = new Buffers.NOT()

  not.set(h.randomBit())
  t.output(not.toString())
  t.output( ".    |   A   |   Y   |")
  t.matches(".    | (0,1) | (0,1) |", () => typeof not.Q, "boolean")
  t.isTrue( ".    |   0   |   1   |", () => not.set(false))
  t.isFalse(".    |   1   |   0   |", () => not.set(true))
}
{
  const wire = new Buffers.Wire()

  wire.set(h.randomBit())
  t.output(wire.toString())
  t.output( ".    |   A   |   Y   |")
  t.matches(".    | (0,1) | (0,1) |", () => typeof wire.Q, "boolean")
  t.isFalse(".    |   0   |   0   |", () => wire.set(false))
  t.isTrue( ".    |   1   |   1   |", () => wire.set(true))
}
