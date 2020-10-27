const route = require('express').Router()
const CalendarController = require('../controllers/calendarController')

route.get('/:country', CalendarController.showHolidays)

module.exports = route