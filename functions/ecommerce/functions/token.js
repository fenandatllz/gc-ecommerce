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
    decodedToken: async (token) => {
        jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
            if(err) { 
                console.log(err) 
                return res.end() 
            }
            else
            {
                console.log('decoded-string: '+JSON.stringify(decoded.idUser))
                console.log('idUser: '+decoded.idUser)
                return JSON.stringify(decoded.idUser)
                // console.log(decoded)
                // console.log(decoded.idSession+" - "+req.session.id)

                // if(req.session.login){
                //     console.log("session valid !!")
                // } 

                // const app = catalyst.initialize(req)
                // let query = `SELECT * FROM users WHERE users.ROWID = '${decoded.idUser}'`;
                // console.log(query)

                // let zcql = app.zcql();
                // let zcqlPromise = zcql.executeZCQLQuery(query);
                // zcqlPromise.then(async queryResult => { 
                //     if (queryResult.length > 0){
                //         console.log("user valid !!")
                //         if(req.session.login){
                //             console.log("token valido")
                //             next()
                //         }
                //     } 
                // })
            }
        })
    }
}

module.exports = functions