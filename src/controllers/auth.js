const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appConfig = require('../config/appConfig')
const getFilePutUrl = require('../services/aws/getFilePutUrl')
const {v1} = require('uuid')

exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({
            where: { email }
        }) 

        if (!user) return res.status(400).json({ error: 'invalidUser' })
        //console.log('password is:', password) 
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) return res.status(400).json({ error: 'invalidPassword' })
        
        return res.status(200).json(getUserWithToken(user.toJSON()))

    } catch (e) {
        return res.status(500).json({error: e.message})
    }

}

exports.register = async (req, res) => {

    const newUser = req.body

    if (newUser.avatar) newUser.avatar=`${v1()}-${newUser.avatar}`
        
    try {
        const user = await User.create(newUser)
        
        const userObj = user.toJSON()

        const response = getUserWithToken(userObj)

        if (newUser.avatar) {
            response.uploadUrl = getFilePutUrl(
                userObj.avatar,
                'image/*'
            )
        }

        res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({error: e.message})
    }

}

exports.update = async (req, res) => {
    
    const userUpdates = req.body
    //console.log(userUpdates)

    if (userUpdates.avatar) userUpdates.avatar=`${v1()}-${userUpdates.avatar}`

    
    if (userUpdates.password === '') delete userUpdates.password
    //console.log('user updates', userUpdates, 'current user data', req.authedUser)

    let myLogs = ''
    try {
        myLogs += 'about to call User.update ' + JSON.stringify(userUpdates) + ' ' + req.authedUser.userId + '/n'
        const [resultCnt, user] = await User.update(userUpdates, {
            where: { userId: req.authedUser.userId }, 
            returning: true, 
            individualHooks: true
        })

        console.log('about to assing userObj')
        myLogs += 'about to assing userObj' + '/n'

        const userObj = user[0].toJSON()

        myLogs += 'about to get user with token' + '/n'

        const response = getUserWithToken(userObj)
        
        myLogs += 'about to call User.update resonse.avatar = ' + response.avatar + ' userUpdates.avatar = ' + userUpdates.avatar + '/n'


        if (userUpdates.avatar) {

            myLogs += 'in if avatar statement' + '/n'

            //console.log('in user.avatar if :', userObj)
            response.uploadUrl = getFilePutUrl(
                userObj.avatar,
                'image/*'
            )
        }
        myLogs += 'exited if' + '/n'
        
        return res.status(200).json(response)
        
    } catch (e) {
        console.log(e)
        return res.status(500).json({error: e.message, myLogs})
    }

}

const getUserWithToken = (user) => {
    delete user.password

    const token = jwt.sign(user, appConfig.key, { expiresIn: 60 * 60 * 7 * 24 })
    
    return {user, token}
}

//versions tht used multer file upload
// exports.register = async (req, res) => {

//     const newUser = req.body
//     const file = req?.file

//     if(file) newUser.avatar = file.filename
    
//     try {
//         const user = await User.create(newUser)

//         res.status(200).json(getUserWithToken(user.toJSON()))
//     } catch (e) {
//         return res.status(500).json({error: e.message})
//     }

// }

// exports.update = async (req, res) => {
    
//     const userUpdates = req.body
//     const file = req?.file

//     if(file) userUpdates.avatar = file.filename


//     delete userUpdates.userId //delete the user Id that was added during file upload

    
//     if (userUpdates.password === '') delete userUpdates.password
//     console.log('user updates', userUpdates, 'current user data', req.authedUser)

//     try {


//         const [resultCnt, user] = await User.update(userUpdates, {
//             where: { userId: req.authedUser.userId }, 
//             returning: true, 
//             individualHooks: true
//         })

        
//         return res.status(200).json(getUserWithToken(user[0].toJSON()))
        
//     } catch (e) {
//         return res.status(500).json({error: e.message})
//     }

// }