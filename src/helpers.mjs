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
export const nibbles = {
  x0: ArrayOf(4, () => false),
  x1: ArrayOf(3, () => false).concat([true]),
  xF: ArrayOf(4, () => true),
  xZ: ArrayOf(4, () => undefined),
}

export const bytes = {
  x00: ArrayOf(8, () => false),
  x01: nibbles.x0.concat(nibbles.x1),
  x0F: nibbles.x0.concat(nibbles.xF),
  x11: nibbles.x1.concat(nibbles.x1),
  x1F: nibbles.x1.concat(nibbles.xF),
  xF1: nibbles.x1.concat(nibbles.xF),
  xFF: ArrayOf(8, () => true),
  xZZ: ArrayOf(8, () => undefined),
}
