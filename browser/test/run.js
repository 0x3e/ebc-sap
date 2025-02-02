import "./tests/gates.test.js"
import "./tests/sr_latch.test.js"
import "./tests/d_latch.test.js"
import "./tests/and_edge_detector.test.js"
import "./tests/d_flipflop.test.js"
import "./tests/pub_sub.test.js"
import "./tests/d_latch_display.test.js"
import "./tests/registers.test.js"
import "./tests/register_display.test.js"
import "./tests/adders.test.js"
import "./tests/alu.test.js"
import "./tests/bus.test.js"
import "./tests/rams.test.js"
import "./tests/rams_display.test.js"
import "./tests/ebc_sap.test.js"

mocha.checkLeaks()
mocha.run((m) => {
  addEventListener("end",window.scrollTo(0, document.body.scrollHeight))
})
