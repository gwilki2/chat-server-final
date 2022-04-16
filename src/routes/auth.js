const router = require('express').Router()
const {login, register, update}  = require('../controllers/auth')
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')
const {validateLogin} = require('../validate')

router.post('/login', validateLogin, login)

router.post('/register', register)
//router.post('/register', upload.single('avatar'), register) //removing multer file upload

router.post('/update', auth, update)
//router.post('/update', auth, upload.single('avatar'), update) //removing multer file upload

module.exports = router