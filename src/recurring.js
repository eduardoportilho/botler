const later = require('later')

module.exports = {

  isTimeInRecurring: function isTimeInRecurring(recurringExpression, time) {
    time = time || new Date()
    let schedule = later.schedule(later.parse.text(recurringExpression))
    // TODO: consider last execution and next execution to round the dates
    return schedule.isValid(time)
  }
}
