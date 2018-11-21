const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validate')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
var server = http.createServer(app)
var io = socketIO(server)
var nConnectedUsers = 0

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')
    nConnectedUsers++
    console.log(`Currently ${nConnectedUsers} users connected.`)

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required')
        }

        socket.join(params.room)
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


        callback()
    })

    socket.on('createMessage', (msg, callback) => {
        //socket.broadcoast.emit from Admin text 
        var message = generateMessage(msg.from, msg.text)
        console.log(message)

        io.emit('newMessage', message)
        callback('')
    })


    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))

    })


    socket.on('disconnect', () => {
        console.log('User disconnected')
        nConnectedUsers--
        console.log(`Currently ${nConnectedUsers} users connected.`)
    })

})

server.listen(port, () => {
    console.log(`server up and listening at port ${port}`)
    if (process.env)
        console.log(`http://localhost:${port}`)
})