const jwt = require('jsonwebtoken')
const appConfig = require('../config/appConfig')

module.exports = (req, res, next) => {
    console.log('auth middleware')
    const bearerToken = req.headers['authorization']
    const token = bearerToken?.split(' ')
    if (!token?.[1]) return res.status(401).json({ error: 'Not authorized.  Missing auth token' })
    jwt.verify(token[1], appConfig.key, (err, user) => {
        if (err) {
            return res.status(401).json({error: err})
        }
        else {
            console.log(req.body)
            req.authedUser = user
        }
    })
    console.log('auth middleware end') 

    next() 
} 