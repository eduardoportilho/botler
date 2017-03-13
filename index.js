const trafikverket = require('trafikverket')
const _ = require('lodash')

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear(/hello/i, (event, next) => { // We use a regex instead of a hardcoded string
    const first_name = event.user.first_name
    bp.messenger.sendText(event.user.id, 'Hello, ' + first_name, { typing: true })
  })

  bp.hear(/^sj\s/i, (event, next) => { // We use a regex instead of a hardcoded string
    handleUserTextMessage(event.user.id, event.text)
  })
   
  bp.recurringTask = () => {
    let tasks = [
      {
        userId: '1110522745724783',
        command: 'sj Fle Cst',
        when: 'Weekdays at 06:30'
      }
    ]

    tasks.forEach((task) => {
      if (isTimeMatch(task.when)) {
        handleUserTextMessage(task.userId, task.command)
      }
    })
  }
  
  function handleUserTextMessage(userId, text) {
    const commandTokens = _.chain(text)
      .split(' ')
      .drop()
      .value()
    bp.messenger.sendText(userId, getDeparturesMessage(commandTokens), { typing: true })

    trafikverket.getDepartures.apply(this, commandTokens).then((departures) => {
      departures.forEach((departure) => {
          bp.messenger.sendText(
            event.user.id, 
            `Train ${departure.train} departing at ${departure.time} to ${departure.destination} stoping at: ${departure.via.join(', ')}`,
            { typing: true }
          )
        })
    })
  }
}

function isTimeMatch(recurringStatement) {
  // TODO: implement recurring time matching
  return true
}

function getDeparturesMessage(commandTokens) {
  var message = `SJ departures from '${commandTokens[0]}'`
  if (commandTokens.length > 1) {
    message += ` to '${commandTokens[1]}'`
  }
  message += ':'
  return message
}
