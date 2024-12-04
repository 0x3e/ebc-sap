import {spawnSync} from "node:child_process"
import fs from "node:fs"
const files = fs.readdirSync("test/")
const jsFiles = files.filter(f => f.endsWith(".tt.js"))
for (const file of jsFiles) {
  let result = spawnSync("node", [`test/${file}`], {shell: true, stdio: "inherit"})
  if(result.status === 0)
    console.log(`ok - ${file}`)
  else
    console.log(`not ok - ${file}`)

}
