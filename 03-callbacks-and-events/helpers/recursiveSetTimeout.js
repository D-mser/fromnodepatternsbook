import { EventEmitter } from 'events'

/**
 * @description A recursive function that emits tick events every 50ms until time runs out
 * @param {Number} startTime
 * @param {Number} endTime
 * @param {CallableFunction} callback
 * @param {EventEmitter} emitter
 * @param {Number} counter
 * @returns Function
 */
export function recursiveSetTimeout (startTime, endTime, callback, emitter, counter) {
  const elapsedTime = Date.now() - startTime

  if (elapsedTime >= endTime) {
    return callback(null, counter)
  }

  setTimeout(() => {
    emitter.emit('tick')
    ++counter
    return recursiveSetTimeout(startTime, endTime, callback, emitter, counter)
  }, 50)
}