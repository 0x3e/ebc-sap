import {describe, eq, it, ok} from "../lib/test.mjs"
import * as h from "../src/helpers.mjs"
import {FourBitAddressable} from "../src/rams.mjs"
import {FourBitAddressableDisplay} from "../src/rams_display.mjs"

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
    fbad.ADDRN = h.nibbles.xF
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
    fbad.INB = h.bytes.xF0
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
