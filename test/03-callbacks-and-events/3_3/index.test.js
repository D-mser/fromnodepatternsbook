import { tickerModified } from '../../../03-callbacks-and-events/3_3/index.js'

import { expect } from 'chai'
import sinon from 'sinon'

describe('ticker modified to emit an extra tick event at invoke time', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should emit tick immediately after being called', function () {
    const spy = sinon.spy()
    const emitter = tickerModified(100, () => {})

    emitter.on('tick', spy)

    process.nextTick(() => {
      expect(spy.called).to.be.true
    })
  })

  it('should continue to emit tick events at approximately 50ms intervals', () => {
    const mockCallback = sinon.spy()
    const emitter = tickerModified(200, mockCallback)

    const tickListener = sinon.spy()
    emitter.on('tick', tickListener)

    clock.runAll()

    expect(tickListener.callCount).to.equal(4 + 1) // 1 event emitted at function call
    expect(mockCallback.calledWith(null, 4 + 1)).to.be.true
  })
})