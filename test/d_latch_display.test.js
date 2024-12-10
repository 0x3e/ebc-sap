import {describe, eq, it, ok} from "../lib/test.mjs"
import {DLatch} from "../src/d_latch.js"
import {DLatchDisplay} from "../src/d_latch_display.js"
import * as h from "../src/helpers.js"

//NOTbiome-ignore format: text alignment
describe("DLatchDisplay", () => {
  it("txt display", () => {
    const dLd = new DLatchDisplay()
    eq(
      dLd.txt(),
      `\
        DLatch           
        _______          
  D -?--|     |--?- Q    
        |     |          
 EN -?--|     |          
        |     |          
        |     |o-?- NOTQ 
        -------          \
`,
    )
    dLd.D = true
    eq(
      dLd.txt(),
      `\
        DLatch           
        _______          
  D -1--|     |--?- Q    
        |     |          
 EN -?--|     |          
        |     |          
        |     |o-?- NOTQ 
        -------          \
`,
    )
    dLd.EN = true
    eq(
      dLd.txt(),
      `\
        DLatch           
        _______          
  D -1--|     |--?- Q    
        |     |          
 EN -1--|     |          
        |     |          
        |     |o-?- NOTQ 
        -------          \
`,
    )
    dLd.Q = true
    eq(
      dLd.txt(),
      `\
        DLatch           
        _______          
  D -1--|     |--1- Q    
        |     |          
 EN -1--|     |          
        |     |          
        |     |o-?- NOTQ 
        -------          \
`,
    )
    dLd.NOTQ = false
    eq(
      dLd.txt(),
      `\
        DLatch           
        _______          
  D -1--|     |--1- Q    
        |     |          
 EN -1--|     |          
        |     |          
        |     |o-0- NOTQ 
        -------          \
`,
    )
  })
  it("joins", () => {
    const dL = new DLatch()
    const dLd = new DLatchDisplay()

    dLd.dlatch = dL
    dL.D = true
    dL.EN = true
    eq(
      dLd.txt(),
      `\
        DLatch           
        _______          
  D -1--|     |--1- Q    
        |     |          
 EN -1--|     |          
        |     |          
        |     |o-0- NOTQ 
        -------          \
`,
    )
  })
})
