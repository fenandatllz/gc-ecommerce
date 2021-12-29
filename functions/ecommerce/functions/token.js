const jwt = require('jsonwebtoken')

const functions = {
    createToken: async (IDUser, req, res) =>{
        const token = await jwt.sign({ idUser: IDUser, idSession: req.session.id}, process.env.JWT_SECRET, {
            expiresIn: 86400 //24 horas 
        })
        // req.session.active = true
        req.session.login = true
        req.session.token = token

        return true
    },
}

module.exports = functions