const route = require('express').Router()
const WeatherController = require('../controllers/weatherController')

route.get('/', WeatherController.currentWeather)

module.exports = route