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
  x1: [true].concat(ArrayOf(3, () => false)),
  xF: ArrayOf(4, () => true),
  xZ: ArrayOf(4, () => undefined),
}

export const bytes = {
  x00: ArrayOf(8, () => false),
  x01: nibbles.x1.concat(nibbles.x0),
  x0F: nibbles.xF.concat(nibbles.x0),
  x11: nibbles.x1.concat(nibbles.x1),
  x1F: nibbles.xF.concat(nibbles.x1),
  xF1: nibbles.xF.concat(nibbles.x1),
  xFF: ArrayOf(8, () => true),
  xZZ: ArrayOf(8, () => undefined),
}
