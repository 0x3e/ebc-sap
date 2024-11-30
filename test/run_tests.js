/* global console */
import fs from 'fs'
import { spawnSync } from 'child_process'
const files = fs.readdirSync('test/')
const jsFiles = files.filter(f => f.endsWith('.tt.js'))
for (const file of jsFiles) {
  console.log(file)
  spawnSync('node', [`test/${file}`], { shell: true, stdio: 'inherit' })
}
