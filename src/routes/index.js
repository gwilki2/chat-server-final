const router = require('express').Router()
const authRoutes = require('./auth')
const messagesRoutes = require('./messages')

router.get('/', (req, res) => {
    res.send(`I'm Online`)
})
router.use(authRoutes)
router.use(messagesRoutes)

module.exports = router