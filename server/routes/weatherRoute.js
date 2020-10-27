const route = require('express').Router()
const WeatherController = require('../controllers/weatherController')

route.get('/:city', WeatherController.currentWeather)

module.exports = route