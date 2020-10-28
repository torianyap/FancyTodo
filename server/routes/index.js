const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const weatherRoute = require('./weatherRoute')

route.use('/todos', todoRoute)
route.use('/users', userRoute)
route.use('/weathers', weatherRoute)

module.exports = route