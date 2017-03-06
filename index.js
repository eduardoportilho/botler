module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear(/hello/i, (event, next) => { // We use a regex instead of a hardcoded string
    const first_name = event.user.first_name

    bp.messenger.sendText(event.user.id, 'Hello, ' + first_name, { typing: true })
  })


  bp.hear(/^sj\s/i, (event, next) => { // We use a regex instead of a hardcoded string
    const first_name = event.user.first_name
    const text = event.text

    bp.messenger.sendText(event.user.id, `SJ request: [${text}]]`, { typing: true })
  })
}
