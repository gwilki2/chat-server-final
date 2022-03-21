const router = require('express').Router()
const {login, register, update}  = require('../controllers/auth')
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')

router.post('/login', login)

router.post('/register', upload.single('avatar'), register)

router.post('/update', auth, upload.single('avatar'), update)

module.exports = router