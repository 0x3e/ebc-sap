import {DLatchDisplay} from "../src/d_latch.display.js"
import * as h from "../src/helpers.js"
import {describe, it} from "./ttester.js"

//NOTbiome-ignore format: text alignment
describe("DLatchDisplay", () => {
  const dLd = new DLatchDisplay()
  console.log(dLd.txt())
  dLd.D = true
  dLd.EN = true
  dLd.Q = true
  console.log(dLd.txt())
  dLd.Q = false
  console.log(dLd.txt())
  it.isFalse("is a DLatch", () => dLd.isBrowser)
})
