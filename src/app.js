const express = require('express')
const combinedRoutes = require('./routes')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

const app = express()

app.use(helmet({crossOriginResourcePolicy: {policy:'cross-origin'}}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public')))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(combinedRoutes)

module.exports = app