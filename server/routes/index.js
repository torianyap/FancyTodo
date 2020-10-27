const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const calendarRoute = require('./calendarRoute')
const weatherRoute = require('./weatherRoute')

route.use('/todos', todoRoute)
route.use('/users', userRoute)
route.use('/holidays', calendarRoute)
route.use('/weathers', weatherRoute)

module.exports = route