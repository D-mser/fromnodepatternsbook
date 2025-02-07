import { EventEmitter } from 'events'

export function ticker (number, callback) {
  const emitter = new EventEmitter()
  const delay = 50
  let startTime = Date.now()
  let counter = 0

  function recursiveSetTimeout () {
    const elapsedTime = Date.now() - startTime

    if (elapsedTime >= number) {
      return callback(null, counter)
    }

    setTimeout(() => {
      emitter.emit('tick')
      ++counter
      return recursiveSetTimeout()
    }, delay)
  }

  recursiveSetTimeout()

  return emitter
}