var socket = io()

socket.on('connect', () => {
    console.log('connected to the server')

})

socket.on('disconnect', function() {
    console.log('Disconnected from the server')
})

socket.on('newMessage', function(msg) {
    console.log('newMessage:', msg)
    var li = jQuery('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)

    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from}`)
    a.attr('href', message.url)

    li.append(a)

    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    })
})

var locationButton = jQuery('#send-location')

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        /* geolocation is NOT available */
        return alert('Geolocation not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.')
    })
})