import "./tests/d_flipflop.test.js"
import "./tests/pub_sub.test.js"
import "./tests/d_latch.test.js"
import "./tests/gates.test.js"
import "./tests/d_latch_display.test.js"
import "./tests/and_edge_detector.test.js"
import "./tests/sr_latch.test.js"

mocha.checkLeaks()
mocha.run()
