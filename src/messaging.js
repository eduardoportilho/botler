module.exports = {
  getDeparturesMessage: function(commandTokens) {
    var message = `SJ departures from '${commandTokens[0]}'`
    if (commandTokens.length > 1) {
      message += ` to '${commandTokens[1]}'`
    }
    message += ':'
    return message
  }
}