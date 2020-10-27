const axios = require('axios')

class CalendarController {
    static showHolidays (req, res, next) {
        const year = new Date().getFullYear()
        axios({
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDERIFIC_TOKEN}&country=id&year=${year}`,
            method: 'get'
        })
        .then(result => {   
            res.status(200).json(result.data.response.holidays)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CalendarController