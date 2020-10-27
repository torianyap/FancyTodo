const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const calendarRoute = require('./calendarRoute')

route.use('/todos', todoRoute)
route.use('/users', userRoute)
route.use('/calendars', calendarRoute)

module.exports = route