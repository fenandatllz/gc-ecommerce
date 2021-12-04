const bcrypt = require('bcryptjs')

const functions = {
    encryptPassword: async (pass, email) => {
        const salt = await bcrypt.genSalt(10)
        let Psw = await bcrypt.hash(pass, salt)
        return Psw
    },
    comparePasword: async (pass, resPass) => {
        return await bcrypt.compare(pass, resPass)
    }
}

module.exports = functions
