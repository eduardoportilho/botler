module.exports = {
  getDeparturesIntoMessage: (commandTokens) => {
    var message = `SJ departures from '${commandTokens[0]}'`
    if (commandTokens.length > 1) {
      message += ` to '${commandTokens[1]}'`
    }
    message += ':'
    return message
  },

  getDepartureAnnouncementMessage: (departure) => {
    return `Train ${departure.train} departing at ${departure.time} to ${departure.destination} stoping at: ${departure.via.join(', ')}`
  }
}