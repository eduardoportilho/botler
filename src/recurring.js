const later = require('later')
const moment = require('moment')

module.exports = {

  isTimeInRecurring: (recurringExpression, toleranceInMinutes, time) => {
    time = time || new Date()
    toleranceInMinutes = toleranceInMinutes || 0
    let schedule = later.schedule(later.parse.text(recurringExpression))
    let start = moment(time)
      .subtract(toleranceInMinutes, 'minutes')
      .startOf('minute');

    let nextOcurrence = moment(schedule.next(1, start))
    let diffInMinutes = nextOcurrence.diff(start, 'minutes')
    return diffInMinutes <= (2 * toleranceInMinutes)
  }
}
