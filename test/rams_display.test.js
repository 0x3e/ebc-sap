import {describe, eq, it, ok} from "../lib/test.mjs"
import {FourBitAddressableDisplay} from "../src/display/rams.mjs"
import * as h from "../src/helpers.mjs"
import {FourBitAddressable} from "../src/rams.mjs"

describe("FourBitAddressableDisplay", () => {
  it("txt display", () => {
    const fbad = new FourBitAddressableDisplay()
    eq(
      fbad.txt(),
      `\
    FourBitAddressable    
          _______         
   WR -?--|     |-??- OUT 
          |     |         
   EN -?--|     |         
          |     |         
 ADDR -?--|     |         
          |     |         
   IN -??-|     |         
          -------         \
`,
    )
    fbad.WR = true
    eq(
      fbad.txt(),
      `\
    FourBitAddressable    
          _______         
   WR -1--|     |-??- OUT 
          |     |         
   EN -?--|     |         
          |     |         
 ADDR -?--|     |         
          |     |         
   IN -??-|     |         
          -------         \
`,
    )
    fbad.ADDR = h.nibbles.xF
    eq(
      fbad.txt(),
      `\
    FourBitAddressable    
          _______         
   WR -1--|     |-??- OUT 
          |     |         
   EN -?--|     |         
          |     |         
 ADDR -F--|     |         
          |     |         
   IN -??-|     |         
          -------         \
`,
    )
    fbad.IN = h.bytes.xF0
    eq(
      fbad.txt(),
      `\
    FourBitAddressable    
          _______         
   WR -1--|     |-??- OUT 
          |     |         
   EN -?--|     |         
          |     |         
 ADDR -F--|     |         
          |     |         
   IN -F0-|     |         
          -------         \
`,
    )
  })
})
