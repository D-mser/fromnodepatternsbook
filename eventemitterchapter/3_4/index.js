import { EventEmitter } from 'events'
import { nextTick } from 'process'

/**
 * @description Same as 3_3 but it produces error if timestamp at the moment of a tick is divisible by 5
 * @param {Number} number
 * @param {CallableFunction} callback
 * @returns {EventEmitter}
 */
const DivisibleBy5Error = new Error('Timestamp divisible by 5')

export function tickerModifiedWithError (number, callback) {
  const emitter = new EventEmitter()
  let numberOfTickEvents = 0

  nextTick(() => {
    if (Date.now() % 5 === 0) {
      emitter.emit('error', DivisibleBy5Error)
      return callback(DivisibleBy5Error)
    }
    emitter.emit('tick')
    ++numberOfTickEvents
  })

  recursiveSetTimeout(Date.now(), number, callback, emitter, 1)

  return emitter
}

function recursiveSetTimeout (startTime, endTime, callback, emitter, numberOfTickEvents) {
  const elapsedTime = Date.now() - startTime

  if (elapsedTime >= endTime) {
    return callback(null, numberOfTickEvents)
  }

  setTimeout(() => {
    if (Date.now() % 5 === 0) {
      emitter.emit('error', DivisibleBy5Error)
      return callback(DivisibleBy5Error)
    }

    emitter.emit('tick')
    ++numberOfTickEvents
    return recursiveSetTimeout(startTime, endTime, callback, emitter, numberOfTickEvents)
  }, 50)
}