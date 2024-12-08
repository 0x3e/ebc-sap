import {test as describe} from "uvu"
import * as it from "uvu/assert"
import {DLatch} from "../src/d_latch.js"
import {DLatchDisplay} from "../src/d_latch_display.js"
import * as h from "../src/helpers.js"

//NOTbiome-ignore format: text alignment
describe("DLatchDisplay", () => {
  const dLd = new DLatchDisplay()
  it.is(
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
  it.is(
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
  it.is(
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
  it.is(
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
  it.is(
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
describe("DLatchDisplay joining", () => {
  const dL = new DLatch()
  const dLd = new DLatchDisplay()

  dLd.dlatch = dL
  dL.D = true
  dL.EN = true
  it.is(
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
describe.run()
