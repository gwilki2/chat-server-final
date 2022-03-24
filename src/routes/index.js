const router = require('express').Router()
const authRoutes = require('./auth')


router.get('/test', (req, res) => {
    res.send(`I'm Online`)
})
router.use(authRoutes)

module.exports = router