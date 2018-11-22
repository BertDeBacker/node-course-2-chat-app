const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validate')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const { Users } = require('./utils/users')

const app = express()
var server = http.createServer(app)
var io = socketIO(server)
var nConnectedUsers = 0
var users = new Users()

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required')
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
            //socket.leave(params.room)

        //io.emit               - send message to everyone connected
        //socket.broadcast.emit - send message to everyone connected expect the user sending
        //socket.emit           - send message to one user  

        //in relation to rooms
        //io.emit -> io.to('roomName').emit                             - send message to everyone connected
        //socket.broadcast.emit -> socket.broadcast.emit.to('roomName') - send message to everyone connected expect the user sending
        //socket.emit   (to one person, independant of the room)        - send message to one user  

        // socket.emit from Admin text Welcome to the chat app
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))

        console.log('users:', users.length)
        callback()
    })

    socket.on('createMessage', (msg, callback) => {
        //socket.broadcoast.emit from Admin text 
        var user = users.getUser(socket.id)
        var message = generateMessage(user.name, msg.text)
            //console.log(message)

        io.to(user.room).emit('newMessage', message)
        callback('')

    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room ${user.room}`))
        }
    })
})

server.listen(port, () => {
    console.log(`server up and listening at port ${port}`)
    if (process.env)
        console.log(`http://localhost:${port}`)
})