import { readdir } from 'node:fs'

import { findKeywordInFile } from './helpers/findKeywordInFile.js'
import { TaskQueue } from './TaskQueue.js'

/**
 * @description Recursively find all files that contain keyword
 * @param {String} dir
 * @param {String} keyword
 * @param {CallableFunction} cb
 */

const CONCURRENCY = 5

export function recursiveFind (dir, keyword, cb) {
  const queue = new TaskQueue(CONCURRENCY)
  const matches = []

  queue.on('empty', () => {
    cb(null, matches)
  })
    .on('error', (err) => cb(err))

  queue.pushTask((done) => processDir(dir, keyword, queue, matches, done))
}

function processDir (dir, keyword, queue, matches, cb) {
  readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) return cb(err)

    if (!files.length) return cb(null)

    files.forEach((file) => {
      const filePath = `${file.path}/${file.name}`

      if (file.isFile())
        queue.pushTask((done) => findKeywordInFile(filePath, keyword, matches, done))

      if (file.isDirectory())
        queue.pushTask((done) => processDir(filePath, keyword, queue, matches, done))
    })

    return cb(null)
  })
}

