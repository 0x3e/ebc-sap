export function randomBit() {
  return Math.floor(Math.random() * 2) === 0
}

export function ArrayOf(i, things) {
  return new Array(i).fill().map(() => things())
}

export function randomBits(i) {
  return ArrayOf(i, () => randomBit())
}

export function isBits(bits) {
  if (!Array.isArray(bits)) return false
  return bits.every(bit => typeof bit === "boolean")
}

export function isUndefBits(bits) {
  if (!Array.isArray(bits)) return false
  return bits.every(bit => bit === undefined)
}

export function ArrayShallowEq(a1, a2) {
  return (
    a1.length === a2.length &&
    a1.every((value, index) => value === a2[index])
  )
}

export function throwOnNaB(...args) {
  for (const bit of Array.from(args).flat()) {
    if (typeof bit !== "boolean") throw new Error("NaB")
  }
}

export function bitsToInt(bits) {
  if (!isBits(bits)) return undefined
  const len = bits.length - 1
  let out = 0
  bits.forEach((bit, i) => {
    out += !!bits[len - i] << +i
  })
  return out
}

export function nibbleToHex(bits) {
  if (!isBits(bits)) return "?"
  return bitsToInt(bits).toString(16).toUpperCase()
}

export function byteToHex(bits) {
  if (!isBits(bits)) return "??"
  return bitsToInt(bits).toString(16).toUpperCase().padStart(2, "0")
}

export const nibbles = {
  x0: ArrayOf(4, () => false),
  x1: ArrayOf(3, () => false).concat([true]),
  xF: ArrayOf(4, () => true),
  xZ: ArrayOf(4, () => undefined),
  xN: ArrayOf(4, () => null),
}

export const bytes = {
  x00: ArrayOf(8, () => false),
  x01: nibbles.x0.concat(nibbles.x1),
  x0F: nibbles.x0.concat(nibbles.xF),
  x11: nibbles.x1.concat(nibbles.x1),
  x1F: nibbles.x1.concat(nibbles.xF),
  xF0: nibbles.xF.concat(nibbles.x0),
  xF1: nibbles.x1.concat(nibbles.xF),
  xFF: ArrayOf(8, () => true),
  xZZ: ArrayOf(8, () => undefined),
  xNN: ArrayOf(8, () => null),
}
