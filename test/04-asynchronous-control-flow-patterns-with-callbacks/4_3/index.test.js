import mock from 'mock-fs'
import { expect } from 'chai'

import {
  findKeywordPiggybackingOnListNestedFiles
} from '../../../04-asynchronous-control-flow-patterns-with-callbacks/4_3/findKeywordPiggybackingOnListNestedFiles.js'
import { recursiveFind } from '../../../04-asynchronous-control-flow-patterns-with-callbacks/4_3/recursiveFind.js'

describe('find all files in given path where keyword has at least one match', function () {
  beforeEach(function () {
    mock({
      'dir': {
        'subdir': {
          'fileA.txt': fileAContent
        },
        'fileB.txt': fileBContent,
        'anotherSubdir': {
          'yetAnotherSubdir': {
            'fileC.txt': fileCContent,
          },
          'fileD.txt': fileDContent
        }
      },
    })
  })

  afterEach(function () {
    mock.restore()
  })

  it('finds matches piggybacking on listNestedFiles', function (done) {
    findKeywordPiggybackingOnListNestedFiles('dir', 'the', function (err, matches) {
      if (err) return done(err)
      expect(matches.length).to.equal(4)
      done()
    })
  })

  it('finds matches recursively', function (done) {
    recursiveFind('dir', 'optional', (err, matches) => {
      expect(matches.length).to.equal(2)
      done()
    })
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
const fileDContent = 'The fs.readFile() method asynchronously reads the contents of a file into memory one chunk at a time, allowing the event loop to turn between each chunk.\n' +
  'This allows the read operation to have less impact on other activity that may be using the underlying libuv thread pool but means that it will take longer to read a complete file into memory.\n' +
  'The additional read overhead can vary broadly on different systems and depends on the type of file being read. \n' +
  'If the file type is not a regular file (a pipe for instance) and Node.js is unable to determine an actual file size, each read operation will load on 64 KiB of data. For regular files, each read will process 512 KiB of data.\n' +
  'For applications that require as-fast-as-possible reading of file contents, it is better to use fs.read() directly and for application code to manage reading the full contents of the file itself.'