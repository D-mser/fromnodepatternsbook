import { readdir } from 'fs'

/**
 * @description List files recursively
 * @param {String} dir
 * @param {CallableFunction} cb
 * @param {Array} leafFiles
 */

export function listNestedFiles (dir, cb, leafFiles = []) {
  readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) return cb(err)

    let pending = files.length
    if (!pending) return cb(null, leafFiles)

    files.forEach((file) => {
      const filePath = `${dir}/${file.name}`

      if (file.isFile()) {
        leafFiles.push(filePath)
      }

      if (file.isDirectory()) {
        listNestedFiles(filePath, (err) => {
          if (err) return cb(err)
          if (!--pending) cb(null, leafFiles)
        }, leafFiles)
      } else if (!--pending) {
        cb(null, leafFiles)
      }
    })
  })
}