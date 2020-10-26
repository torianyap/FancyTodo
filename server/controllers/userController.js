const { User } = require('../models/index')
const { compare } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')

class UserController {
    static async register(req, res) {
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
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
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
                res.status(401).json({message: 'username or password is incorrect'})
            } else if (!compare(payload.password, user.password)) {
                res.status(401).json({message: 'username or password is incorrect'})
            } else {
                const payload = {
                    id: user.id,
                    email:user.email
                }
                const token = signToken(payload)
                res.status(200).json({accessToken: token})
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController