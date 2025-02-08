import { ticker } from '../../eventemitterchapter/3_2/index.js'

import { expect } from 'chai'
import sinon from 'sinon'

describe('ticker', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should emit tick events at approximately 50ms intervals', () => {
    const mockCallback = sinon.spy()
    const emitter = ticker(200, mockCallback)

    const tickListener = sinon.spy()
    emitter.on('tick', tickListener)

    clock.runAll()

    expect(tickListener.callCount).to.equal(4)
    expect(mockCallback.calledWith(null, 4)).to.be.true
  })

  it('should call the callback with the correct count when time expires', () => {
    const mockCallback = sinon.spy()
    ticker(150, mockCallback)

    clock.runAll()

    expect(mockCallback.calledWith(null, 3)).to.be.true
  })
})