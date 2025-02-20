import { tickerModifiedWithError } from '../../../03-callbacks-and-events/3_4/index.js'

import { expect } from 'chai'
import sinon from 'sinon'

describe('ticker producing error for timestamps divisible by 5', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should produce error when timestamp is divisible by 5', function () {
    const errorListener = sinon.spy()
    const mockCallback = sinon.spy()
    const emitter = tickerModifiedWithError(100, mockCallback)

    emitter.on('error', errorListener)

    const tickListener = sinon.spy()
    emitter.on('tick', tickListener)

    clock.runAll()

    expect(errorListener.callCount).to.equal(1)
    expect(tickListener.callCount).to.equal(0)
    expect(mockCallback.calledOnce).to.be.true
    expect(mockCallback.calledWith(sinon.match.instanceOf(Error))).to.be.true
  })
})