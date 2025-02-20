import mock from 'mock-fs'
import { expect } from 'chai'
import { readFileSync } from 'node:fs'

import { concatFiles } from '../../../04-asynchronous-control-flow-patterns-with-callbacks/4_1/index.js'

describe('concat files sequentially', function () {
  beforeEach(function () {
    mock({
      'fileA.txt': fileAContent,
      'fileB.txt': fileBContent,
      'fileC.txt': fileCContent,
      'dest.txt': '',
    })
  })

  afterEach(function () {
    mock.restore()
  })

  it('copies the contents of each file into destination folder, preserving file order', function (done) {
    concatFiles('dest.txt', function (err) {
      if (err) return done(err)
      const result = readFileSync('dest.txt', 'utf8')
      expect(result).to.equal(expectedDestContent)
      done()
    }, 'fileA.txt', 'fileB.txt', 'fileC.txt')
  })
})

const fileAContent = 'Applies the function iteratee to each item in coll, in parallel.\n' +
  'The iteratee is called with an item from the list, and a callback for when it has finished.\n' +
  'If the iteratee passes an error to its callback, the main callback (for the each function) is immediately called with the error.\n' +
  'Note, that since this function applies iteratee to each item in parallel, there is no guarantee that the iteratee functions will complete in order.\n'
const fileBContent = 'Applies the provided arguments to each function in the array, calling callback after all functions have completed.\n' +
  'If you only provide the first argument, fns, then it will return a function which lets you pass in the arguments as if it were a single function call.\n' +
  'If more arguments are provided, callback is required while args is still optional.\n' +
  'The results for each of the applied async functions are passed to the final callback as an array.\n'
const fileCContent = 'Determines the best order for running the AsyncFunctions in tasks, based on their requirements.\n' +
  'Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied.\n' +
  'If any of the AsyncFunctions pass an error to their callback, the auto sequence will stop.\n' +
  'Further tasks will not execute (so any other functions depending on it will not run), and the main callback is immediately called with the error.\n' +
  'AsyncFunctions also receive an object containing the results of functions which have completed so far as the first argument, if they have dependencies.\n' +
  'If a task function has no dependencies, it will only be passed a callback.'

const expectedDestContent = 'Applies the function iteratee to each item in coll, in parallel.\n' +
  'The iteratee is called with an item from the list, and a callback for when it has finished.\n' +
  'If the iteratee passes an error to its callback, the main callback (for the each function) is immediately called with the error.\n' +
  'Note, that since this function applies iteratee to each item in parallel, there is no guarantee that the iteratee functions will complete in order.\n' +
  'Applies the provided arguments to each function in the array, calling callback after all functions have completed.\n' +
  'If you only provide the first argument, fns, then it will return a function which lets you pass in the arguments as if it were a single function call.\n' +
  'If more arguments are provided, callback is required while args is still optional.\n' +
  'The results for each of the applied async functions are passed to the final callback as an array.\n' +
  'Determines the best order for running the AsyncFunctions in tasks, based on their requirements.\n' +
  'Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied.\n' +
  'If any of the AsyncFunctions pass an error to their callback, the auto sequence will stop.\n' +
  'Further tasks will not execute (so any other functions depending on it will not run), and the main callback is immediately called with the error.\n' +
  'AsyncFunctions also receive an object containing the results of functions which have completed so far as the first argument, if they have dependencies.\n' +
  'If a task function has no dependencies, it will only be passed a callback.'