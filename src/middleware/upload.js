const multer = require('multer')
const { v4 } = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./src/uploads`)
    }, 
    filename: (req, file, cb) => {
        console.log(req.body)
        if(!req.body.userId) req.body.userId = v4()
        cb(null, `${req.body.userId}-${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})