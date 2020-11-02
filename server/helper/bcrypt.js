const bcrypt = require("bcryptjs")

const hashPassword = password => {
    const hashed = bcrypt.hashSync(password, +process.env.SALT)
    return hashed
}

const compare = (password, hashed) => {
    const result = bcrypt.compareSync(password, hashed)
    return result
}

module.exports = {
    hashPassword,
    compare
}