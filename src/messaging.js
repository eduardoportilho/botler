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
    var message = `Train ${departure.train}` + 
      ` at ${departure.time}`
    if (departure.estimatedTime) {
      message +=  ` (est. ${departure.estimatedTime})`  
    }
    message +=  ` to ${departure.destination}` + 
      ` stoping at: ${departure.via.join(', ')}`
  }
}