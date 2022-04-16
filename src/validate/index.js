const { validationResult } = require('express-validator')
const loginRules = require('./auth/loginRules')
const registerRules = require('./auth/registerRules')
const updateRules = require('./auth/updateRules')



const validate = (req, res, next) => {
    const valResult = validationResult(req)
    const hasErrors = !valResult.isEmpty()

    if (hasErrors) return res.status(400).json({ errors: valResult.array() })
    
    next()

}

module.exports = {
    validateLogin: [loginRules, validate], 
    validateRegister: [registerRules, validate], 
    validateUpdate: [updateRules, validate]
}