var socket = io()

socket.on('connect', () => {
    console.log('connected to the server')

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey, this is Bert'
    // })
    socket.emit('createMessage', {
        from: 'Anastasia',
        text: 'what do you want me to wear?'
    })

})

socket.on('disconnect', function() {
    console.log('Disconnected from the server')
})

// socket.on('newEmail', function(email) {
//     console.log('New email', email)
// })

socket.on('newMessage', function(msg) {
    console.log('newMessage:', msg)
})