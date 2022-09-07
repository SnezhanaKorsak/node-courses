const eventEmitter = require('events')

class Logger extends eventEmitter {
  log(message) {
    this.emit('message', `${message} ${new Date().toDateString()}`)
  }
}

const logger = new Logger()

logger.on('message', data => {
  console.log(data)
})

logger.log('Hello')
