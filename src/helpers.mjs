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
  return bits.every(bit => typeof bit === "boolean")
}

export function throwOnNaB(...args) {
  for (const bit of Array.from(args).flat()) {
    if (typeof bit !== "boolean") throw new Error("NaB")
  }
}
export const bytes = {
  x00: ArrayOf(8, () => false),
  xFF: ArrayOf(8, () => true),
  xZZ: ArrayOf(8, () => undefined),
}
