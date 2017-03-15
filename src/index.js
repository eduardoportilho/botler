const trafikverket = require('trafikverket')
const recurring = require('./recurring')
const messaging = require('./messaging')
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
   
  /**
   * Function called by botpress-scheduler
   * @param  {number}   toleranceInMinutes - Number of minutes of tolerance (e.g. {scheduledOn:10:10,
   *                                       expression:'at 10:20', tolerance:10} will execute)
   * @param  {Object}   schedule botpress-scheduler schedule
   * @param  {number}   schedule.taskId - Numeric id
   * @param  {string}   schedule.id - Text id
   * @param  {string}   schedule.scheduleId - Text id
   * @param  {Date}     schedule.scheduledOn - Executing date
   * @param  {string}   schedule.status - Status (e.g. 'pending')
   * @param  {string}   schedule.logs
   * @param  {Date}     schedule.finishedOn
   * @param  {Object}   schedule.returned
   * @param  {boolean}  schedule.enabled
   * @param  {string}   schedule.schedule_type - Schedule type (e.g. 'natural')
   * @param  {string}   schedule.schedule - Schedule text
   * @param  {string}   schedule.schedule_human - Schedule human text
   * @param  {Date}     schedule.created_on
   * @param  {string}   schedule.action - Task source code
   */ 
  bp.recurringTask = (toleranceInMinutes, schedule) => {
    let tasks = [
      {
        userId: '1110522745724783',
        command: 'sj Fle Cst',
        when: 'Every weekday at 06:30'
      }
    ]

    tasks.forEach((task) => {
      if (recurring.isTimeInRecurring(task.when, toleranceInMinutes, new Date())) {
        console.log(`>>> Recurring task time match at ${new Date()}.`)
        handleUserTextMessage(task.userId, task.command)
      } else {
        console.log('>>> Recurring task miss.')
      }
    })
  }
  
  function handleUserTextMessage(userId, text) {
    const commandTokens = _.chain(text)
      .split(' ')
      .drop()
      .value()
    bp.messenger.sendText(userId, messaging.getDeparturesIntoMessage(commandTokens), { typing: true })

    trafikverket.getDepartures.apply(this, commandTokens).then((departures) => {
      departures.forEach((departure) => {
          bp.messenger.sendText(
            event.user.id, 
            messaging.getDepartureAnnouncementMessage(departure),
            { typing: true }
          )
        })
    })
  }
}
