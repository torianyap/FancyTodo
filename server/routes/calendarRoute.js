const route = require('express').Router()
const CalendarController = require('../controllers/calendarController')

route.get('/holidays', CalendarController.showHolidays)

module.exports = route