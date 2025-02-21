import { readFile } from 'node:fs'

/**
 * @description Find keyword in file
 * @param {String} file
 * @param {String} keyword
 * @param {Array} matches
 * @param {CallableFunction} cb
 */

export function findKeywordInFile (file, keyword, matches, cb) {
  const regexp = new RegExp(`${keyword}`, 'gi')

  readFile(file, { encoding: 'utf-8' }, (err, data) => {
    if (err) return cb(err)
    if (regexp.test(data)) matches.push(file)

    cb()
  })
}