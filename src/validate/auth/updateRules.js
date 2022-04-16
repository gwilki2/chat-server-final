const { body } = require('express-validator')

module.exports = [
    body('email').isEmail(),
    body('password').if(body('password').notEmpty()).isLength({ min: 6 }),
    body('firstName').notEmpty(), 
    body('lastName').notEmpty(),
    body('lang').notEmpty(),
    body('gender').notEmpty()
]