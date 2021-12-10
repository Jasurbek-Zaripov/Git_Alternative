const fs = require('fs')
const path = require('path')

let HISTORY = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.data', 'history.json'), 'utf-8')
)

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (!['restore.js', 'watch.js', '.data'].includes(file)) {
      if (fs.statSync(dirPath + '/' + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(dirPath, file))
      }
    }
  })

  return arrayOfFiles
}
//==================== find all files end =============================
getAllFiles(process.cwd()).forEach(file => {
  try {
    fs.watchFile(file, { interval: 100 }, (eve, file_name) => {
      let date = Date.now()
      let path_base = file.replace(process.cwd(), '')
      HISTORY[date] = {
        path_full: file,
        body: fs.readFileSync(file, 'utf-8'),
      }
      console.log(`file change: ${path_base} -> ${date}\n`)
      console.log(HISTORY[date].body)
      fs.writeFileSync(
        path.join(process.cwd(), '.data', 'history.json'),
        JSON.stringify(HISTORY, null, 2)
      )
    })
  } catch (e) {
    console.log('ERROR!---------------------')
  }
})
console.log('files are being watching...\nchiqish uchun: quit')
process.stdin.on('data', data => {
  data += ''
  if (data) {
    process.exit()
  }
})
