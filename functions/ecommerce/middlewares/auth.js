const jwt = require('jsonwebtoken')
const catalyst = require('zcatalyst-sdk-node')
const axios = require('axios').default;
const catalystToken = require('../catalysToken')


const authMW = {
    verifyToken: async (req, res, next) =>{
        console.log(req.session)
        var token = ''
        if(!req.session.token){
            token = req.headers["x-acces-token"]
        }else{
            token = req.session.token
        }

        if(!token) return res.status(403).json({message: 'No token provider'})

        


        jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
            if(err) { 
                console.log(err) 
                return res.end() 
            }
            else
            {
                console.log(decoded)
                console.log(decoded.idSession+" - "+req.session.id)

                if(req.session.login){
                    console.log("session valid !!")
                } 

                const app = catalyst.initialize(req)
                let query = `SELECT * FROM users WHERE users.ROWID = '${decoded.idUser}'`;
                console.log(query)

                let zcql = app.zcql();
                let zcqlPromise = zcql.executeZCQLQuery(query);
                zcqlPromise.then(async queryResult => { 
                    if (queryResult.length > 0){
                        console.log("user valid !!")
                        if(req.session.login){
                            console.log("token valido")
                            next()
                        }
                    } 
                })
            }
        })
    }
}

module.exports = authMW