let sinon = require('sinon')
let expect = require('chai').expect
let recurring = require('../src/recurring')

describe('[recurring.js]', function() {

  describe('On Monday, 2017-01-02 06:30 AM UTC', function() {
    var clock
    beforeEach(function () {
      clock = sinon.useFakeTimers(
        new Date('2017-01-02T06:30:00Z').getTime()
      )  //monday 
    })

    afterEach(function () {
      clock.restore()
    })

    it('"Every weekday" expression should return true', function() {
      let isInRecurring = recurring.isTimeInRecurring('Every weekday')
      expect(isInRecurring).to.be.true;
    })

    it('"Every weekday at 06:30" expression should return true', function() {
      let isInRecurring = recurring.isTimeInRecurring('Every weekday at 06:30')
      expect(isInRecurring).to.be.true;
    })

    it('"Every weekday at 06:35" expression should return true with 5 min tolerance', function() {
      let isInRecurring = recurring.isTimeInRecurring('Every weekday at 06:35', 5)
      expect(isInRecurring).to.be.true;
    })

    it('"Every weekday at 06:25" expression should return true with 5 min tolerance', function() {
      let isInRecurring = recurring.isTimeInRecurring('Every weekday at 06:25', 5)
      expect(isInRecurring).to.be.true;
    })

    it('"Every weekday at 06:24" expression should return false with 5 min tolerance', function() {
      let isInRecurring = recurring.isTimeInRecurring('Every weekday at 06:24', 5)
      expect(isInRecurring).to.be.false;
    })

    it('"Every weekend" expression should return false', function() {
      let isInRecurring = recurring.isTimeInRecurring('Every weekend')
      expect(isInRecurring).to.be.false;
    })
  })
})