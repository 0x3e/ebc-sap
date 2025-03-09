import * as Gates from "./gates.mjs"
import * as h from "./helpers.mjs"
import {PubSub} from "./pub_sub.mjs"

export class ProgramCounter {
  #JUMP = undefined
  #OUT = undefined
  #LOAD = undefined
  #Q = undefined
  #tristate = undefined
}
