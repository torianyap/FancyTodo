const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')

route.use('/todos', todoRoute)
route.use('/users', userRoute)

module.exports = route