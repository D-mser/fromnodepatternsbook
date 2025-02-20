import { EventEmitter } from 'events'
import { recursiveSetTimeout } from '../helpers/recursiveSetTimeout.js'

/**
 * @description A function that emits a tick event as soon as it is invoked and continues to emit tick events every 50ms and stops after the given timer of ticks is reached.
 * @param {Number} number
 * @param {CallableFunction} callback
 * @returns {EventEmitter}
 */
export function tickerModified (number, callback) {
  const emitter = new EventEmitter()
  let counter = 0

  process.nextTick(() => {
    emitter.emit('tick')
    ++counter
  })

  recursiveSetTimeout(Date.now(), number, callback, emitter, ++counter)

  return emitter
}