const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')

    // socket.emit('newEmail', {
    //     from: "Mike@example.com",
    //     text: "He what is goin on",
    //     createdAt: 123
    // })

    socket.emit('newMessage', {
        from: 'Bert',
        text: 'Meeting tonight 21.30h, at my place!',
        createdAt: new Date().toUTCString()
    })

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail)
    // })

    socket.on('createMessage', (msg) => {
        console.log('createMessage', msg)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})



//app.set('view engine', 'pug');

server.listen(port, () => {
    console.log(`server up and listening at port ${port}`)
    console.log(`http://localhost:${port}`)
})