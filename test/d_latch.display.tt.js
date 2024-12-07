import {DLatchDisplay} from "../src/d_latch.display.js"
import * as h from "../src/helpers.js"
import {describe, it} from "./ttester.js"

//NOTbiome-ignore format: text alignment
describe("DLatchDisplay", () => {
  const dLd = new DLatchDisplay()
  it.matches("is undefined DLatch", () => dLd.txt(), `\
       DLatch          
        _____          
  D -?--|   |--?- Q    
        |   |          
 EN -?--|   |--?- NOTQ 
        -----          \
`)
  dLd.D = true
  it.matches("is D=1 DLatch", () => dLd.txt(), `\
       DLatch          
        _____          
  D -1--|   |--?- Q    
        |   |          
 EN -?--|   |--?- NOTQ 
        -----          \
`)
  dLd.EN = true
  it.matches("is D=1 EN=1 DLatch", () => dLd.txt(), `\
       DLatch          
        _____          
  D -1--|   |--?- Q    
        |   |          
 EN -1--|   |--?- NOTQ 
        -----          \
`)
  dLd.Q = true
  it.matches("is D=1 EN=1 Q=1 DLatch", () => dLd.txt(), `\
       DLatch          
        _____          
  D -1--|   |--1- Q    
        |   |          
 EN -1--|   |--0- NOTQ 
        -----          \
`)
  dLd.Q = false
  it.matches("is D=1 EN=1 Q=0 DLatch", () => dLd.txt(), `\
       DLatch          
        _____          
  D -1--|   |--0- Q    
        |   |          
 EN -1--|   |--1- NOTQ 
        -----          \
`)
})
