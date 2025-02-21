import eachLimit from 'async-es/eachLimit.js'

import { listNestedFiles } from '../4_2/index.js'
import { findKeywordInFile } from './helpers/findKeywordInFile.js'

/**
 * @description Recursively find all files that contain keyword
 * @param {String} dir
 * @param {String} keyword
 * @param {CallableFunction} cb
 * @returns {Array}
 */

const FD_LIMIT = 10

export function findKeywordPiggybackingOnListNestedFiles (dir, keyword, cb) {
  listNestedFiles(dir, (err, files) => {
    if (err) return cb(err)

    const matches = []

    if (!files.length) return cb(null, matches)

    eachLimit(files, FD_LIMIT, (file, done) => findKeywordInFile(file, keyword, matches, done), (err) => cb(err, matches))
  })
}
