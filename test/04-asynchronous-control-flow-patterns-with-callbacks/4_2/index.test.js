import mock from 'mock-fs'
import { expect } from 'chai'

import { listNestedFiles } from '../../../04-asynchronous-control-flow-patterns-with-callbacks/4_2/index.js'

describe('list files recursively', function () {
  beforeEach(function () {
    mock({
      'dir': {
        'subdir': {
          'fileA.txt': 'content'
        },
        'fileB.txt': 'content',
        'anotherSubdir': {
          'yetAnotherSubdir': {
            'fileC.txt': 'content',
          },
          'fileD.txt': 'content'
        }
      },
    })
  })

  afterEach(function () {
    mock.restore()
  })

  it('lists all nested files', function (done) {
    listNestedFiles('dir', function (err, files) {
      if (err) return done(err)
      expect(files.length).to.equal(4)
      expect(files).to.have.members([
        'dir/fileB.txt',
        'dir/anotherSubdir/fileD.txt',
        'dir/subdir/fileA.txt',
        'dir/anotherSubdir/yetAnotherSubdir/fileC.txt'

      ])
      done()
    })
  })
})