const { Message, User } = require('../models')


///returns a list of messages with top x count sorted by date decending
exports.getMessagesWithCount = async (req, res, next) => {
    const count = parseInt(req.params.count) || 10

    try {

        const messages = await Message.findAll({
            limit: count,
            order: [
                ['createdAt', 'DESC']
            ], 
            include: {
                model: User, 
                attributes:['userId', 'gender', 'firstName', 'avatar']  //for some reason I have to include userId here, so the get call for avatar can work properly
            }
            
        })
        messages.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1
            if (a.createdAt > b.createdAt) return 1
            return 0
        })

        return res.status(200).json(messages)
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
    
}

///adds a new message
exports.addMessage = async (req, res, next) =>  {

    const { lang, message } = req.body
    const {userId, firstName, avatar, gender} = req.authedUser

    try {
        const messageResult = await Message.create({
            message: message, 
            fromUserId: userId, 
            inLang: lang
        })

        
        return res.status(200).json({ ...messageResult.toJSON(), User: {userId, firstName, avatar, gender} })
    } catch (e) {
        return res.status(500).json({error:e.message})
    }
    
    //return res.status(200).json({ rbody: req.body, authedUser: req.authedUser })
    
}

///
exports.getMessageById = async (req, res, next) => {
    try {
        const message = await Message.findOne({
            where: {
                id: req.params.messageId
            }
        })

        return res.status(200).json(message.toJSON())
    } catch (e) {
        return res.status(500).json({error: e.message})
    }

    //return res.status(200).json({ id: req.params.messageId, rbody: req.body, authedUser: req.authedUser })
}