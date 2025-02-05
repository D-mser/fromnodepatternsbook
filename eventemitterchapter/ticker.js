import { EventEmitter } from 'events'

function ticker (number, callback) {
  const eventEmitter = new EventEmitter()
  const delay = 50
  let startTime = Date.now()
  let counter = 0

  function recursiveSetTimeout () {
    const elapsedTime = Date.now() - startTime

    if (elapsedTime < number) {
      console.log(elapsedTime)
      eventEmitter.emit('tick')
      counter++

      setTimeout(recursiveSetTimeout, delay)
    } else {
      callback(counter)
    }
  }

  recursiveSetTimeout()

  return eventEmitter
}

const tickerInstance = ticker(200, (totalTicks) => {
  console.log(`Total ticks emitted: ${totalTicks}`)
})

tickerInstance.on('tick', () => {
  console.log('Tick!')
})
