require('dotenv').config()

module.exports = {
    url: process.env.APP_URL, 
    port: process.env.APP_PORT, 
    key: process.env.APP_KEY
}