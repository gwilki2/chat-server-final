const socketIo = require('socket.io')

const SocketServer = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*"
        }
    })

    io.on('connection', (socket) => {
        socket.on('join', async (user) => {
            //console.log("New user joined: ", user.firstName)
        })

        socket.on('message', async (message) => {
            io.emit('message', message)
        })
    })
}

module.exports = SocketServer