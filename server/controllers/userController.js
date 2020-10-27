const { User } = require('../models/index')
const { compare } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.create(payload)
            res.status(200).json({
                id: user.id,
                email: user.email
            }) 
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                throw { msg: 'username or password is incorrect', status: 401 }
            } else if (!compare(payload.password, user.password)) {
                throw { msg: 'username or password is incorrect', status: 401 }
            } else {
                const payload = {
                    id: user.id,
                    email:user.email
                }
                const token = signToken(payload)
                res.status(200).json({accessToken: token})
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController