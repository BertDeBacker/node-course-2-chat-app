const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage } = require('./utils/message')

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

    // socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'))

    socket.on('createMessage', (msg, callback) => {
        //socket.broadcoast.emit from Admin text 
        var message = generateMessage(msg.from, msg.text)
        console.log(message)

        io.emit('newMessage', message)
        callback('this is from the server')
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
        nConnectedUsers--
        console.log(`Currently ${nConnectedUsers} users connected.`)
    })

})







//app.set('view engine', 'pug');

server.listen(port, () => {
    console.log(`server up and listening at port ${port}`)
    if (process.env)
        console.log(`http://localhost:${port}`)
})