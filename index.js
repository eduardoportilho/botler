const trafikverket = require('trafikverket')
const _ = require('lodash')

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear(/hello/i, (event, next) => { // We use a regex instead of a hardcoded string
    const first_name = event.user.first_name

    bp.messenger.sendText(event.user.id, 'Hello, ' + first_name, { typing: true })
  })


  bp.hear(/^sj\s/i, (event, next) => { // We use a regex instead of a hardcoded string
    const first_name = event.user.first_name
    const commandTokens = _.chain(event.text)
      .split(' ')
      .drop()
      .value()

    trafikverket.getDepartures.apply(this, commandTokens).then((departures) => {
      var departuresString = 
        _.reduce(departures, (string, departure) => {
         return string + `Train ${departure.train} departing at ${departure.time} to ${departure.destination}\n`
        }, "")

      var message = `SJ departures from '${commandTokens[0]}'`
      if (commandTokens.length > 1) {
        message += ` to '${commandTokens[1]}'`
      }
      message += `:\n${departuresString}`
      bp.messenger.sendText(event.user.id, message, { typing: true })
    })
  })
}
