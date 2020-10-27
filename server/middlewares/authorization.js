const { ToDo } = require('../models')

const authorization = async (req, res, next) => {
    const id = +req.params.id
    try {
        const todo = await ToDo.findByPk(id)
        if (!todo) {
            throw { msg: `Todo is not found`, status: 404 }
        } else if (todo.UserId !== req.user.id) {
            throw { msg: `Not Authorized`, status: 401 }
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization