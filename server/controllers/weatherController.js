const axios = require('axios') 

class WeatherController {
    static currentWeather (req, res, next) {
        axios({
            method: 'GET',
            url: 'https://api.ipgeolocation.io/getip'
        })
        .then(response => {
            const ip = response.data.ip
            return axios({
                method: 'GET',
                url: `https://api.ipgeolocation.io/astronomy?apiKey=${process.env.GEO}&ip=${ip}`
            })
        })
        .then(result => {
            const city = result.data.location.state_prov
            return axios({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER}&units=metric`,
                method: 'GET'
            })
        })
        .then(data => {
            res.status(200).json(data.data)
        })
        .catch(err => {
            next(err)
        })
    }
}
module.exports = WeatherController