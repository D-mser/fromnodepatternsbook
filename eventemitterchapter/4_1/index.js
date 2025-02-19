import mapSeries from 'async-es/mapSeries.js'
import { readFile, appendFile } from 'node:fs'

/**
 * @description Copies the contents of each file into destination folder, preserving file order
 * @param {String} dest
 * @param {CallableFunction} cb
 * @param {...String} files
 * @returns {VoidFunction}
 */
export function concatFiles (dest, cb, ...files) {
  function concat (file, callback) {
    readFile(file, (err, data) => {
      if (err) return callback(err)
      appendFile(dest, data, (err) => {
        if (err) return callback(err)
        callback(null, file)
      })
    })
  }

  mapSeries(files, concat, cb)
}