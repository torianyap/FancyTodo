module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        msg = err.errors.map(el => el.message).join(', ')
    } else if (err.response.data) {
        status = err.response.data.cod
        msg = err.response.data.message
    }
    res.status(status).json({msg})
}