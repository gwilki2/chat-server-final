const app = require('./src/app')
const port = process.env.PORT || require('./src/config/appConfig').port || 3002
const http = require('http')
const SocketServer = require('./src/socket')

const server = http.createServer(app)

SocketServer(server)


server.listen(port, () => console.log(`app listening on port ${port}`))