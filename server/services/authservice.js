//authentication services
const md5 = require('md5')
require('dotenv').config()

let recreatePassword = async(password) => {
    return md5(process.env.SALT + password)
}
module.exports = { recreatePassword }