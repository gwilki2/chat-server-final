const router = require('express').Router()
const { getMessagesWithCount, addMessage, getMessageById } = require('../controllers/messages')
const auth = require('../middleware/auth')

router.get('/messages/:count', auth, getMessagesWithCount)
router.post('/message/new', auth, addMessage)
router.get('/message/find/:messageId', getMessageById)

module.exports = router