const bcryptjs = require('bcryptjs');

const encryptPassword = (password) => {

    const salt = bcryptjs.genSaltSync()
    const encryptPassword = bcryptjs.hashSync(password, salt)

    return encryptPassword
}

module.exports = {encryptPassword};