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



    socket.on('createMessage', (msg) => {
        console.log('createMessage', msg)

        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        })
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