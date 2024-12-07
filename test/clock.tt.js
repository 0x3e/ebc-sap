import {test as describe} from "uvu"
import * as it from "uvu/assert"
const {Clock} = await import("../src/clock.js")
import * as h from "../src/helpers.js"

const c = {}

//t.isTruthy('create', () => (c = Clock()))
//t.isTrue('output', () => (c.output() === true) || (c.output() === false))
