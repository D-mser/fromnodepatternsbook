import { EventEmitter } from 'events'

import { recursiveSetTimeout } from '../helpers/recursiveSetTimeout.js'

/**
 * @description A function that emits tick events every 50ms and stops after the given timer of ticks is reached.
 * @param {Number} number
 * @param {CallableFunction} callback
 * @returns {EventEmitter}
 */
export function ticker (number, callback) {
  const emitter = new EventEmitter()

  recursiveSetTimeout(Date.now(), number, callback, emitter, 0)

  return emitter
}