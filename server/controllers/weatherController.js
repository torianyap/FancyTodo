const axios = require('axios')

class WeatherController {
    static currentWeather (req, res, next) {
        const q = req.params.city // e.g: Jakarta,id / London / Brazil / dll
        axios({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${process.env.WEATHER}`,
            method: 'get'
        })
        .then(result => {   
            res.status(200).json(result.data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = WeatherController