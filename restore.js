const fs = require('fs')
const path = require('path')

let HISTORY = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.data', 'history.json'), 'utf-8')
)
let [, , ID] = process.argv
fs.writeFileSync(HISTORY[ID].path_full, HISTORY[ID].body)
