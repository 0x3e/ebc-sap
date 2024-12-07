import {test as describe} from "uvu"
import * as it from "uvu/assert"
import {DLatchDisplay} from "../src/d_latch.display.js"
import * as h from "../src/helpers.js"

//NOTbiome-ignore format: text alignment
describe("DLatchDisplay", () => {
  const dLd = new DLatchDisplay()
  it.is(
    dLd.txt(),
    `\
       DLatch          
        _____          
  D -?--|   |--?- Q    
        |   |          
 EN -?--|   |--?- NOTQ 
        -----          \
`,
  )
  dLd.D = true
  it.is(
    dLd.txt(),
    `\
       DLatch          
        _____          
  D -1--|   |--?- Q    
        |   |          
 EN -?--|   |--?- NOTQ 
        -----          \
`,
  )
  dLd.EN = true
  it.is(
    dLd.txt(),
    `\
       DLatch          
        _____          
  D -1--|   |--?- Q    
        |   |          
 EN -1--|   |--?- NOTQ 
        -----          \
`,
  )
  dLd.Q = true
  it.is(
    dLd.txt(),
    `\
       DLatch          
        _____          
  D -1--|   |--1- Q    
        |   |          
 EN -1--|   |--0- NOTQ 
        -----          \
`,
  )
  dLd.Q = false
  it.is(
    dLd.txt(),
    `\
       DLatch          
        _____          
  D -1--|   |--0- Q    
        |   |          
 EN -1--|   |--1- NOTQ 
        -----          \
`,
  )
})
describe.run()
