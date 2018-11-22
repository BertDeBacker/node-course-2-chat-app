var socket = io()
var locationButton = jQuery('#send-location')
var userName

//******************************* */
// SOCKET CONNECT / DISCONNECT
//******************************* */
//socket.CONNECT
socket.on('connect', () => {

    var params = jQuery.deparam(window.location.search)
    userName = params.name

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err)
                //redirect to homepage
            window.location.href = '/'
        } else {

        }
    })
})

//socket.DISCONNECT
socket.on('disconnect', function() {
    console.log('Disconnected from the server')
})

//******************************* */
//       VISUALISE MESSAGES
//******************************* */

//Visualize newMessage
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)
    scrollToBottom()
})

//Visualize newLocationMessage
socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html()

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)
    scrollToBottom()
})


//******************************* */
//   UPDATE CHATROOM
//******************************* */
socket.on('updateUserList', function(users) {
    console.log('userList', users)
    var ol = jQuery('<ol></ol>')
    users.forEach(function(user) {
        if (user === userName) {
            //this is you
            ol.append(jQuery('<li></li>').text(`${user}(*)`))
        } else {
            ol.append(jQuery('<li></li>').text(user))
        }

    })

    jQuery('#users').html(ol)
})

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
        // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

//******************************* */
//  CLICK HANDLER FOR SEND MESSAGE
//******************************* */
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var text = jQuery('[name=message]').val()
    if (text === "") { text = "test message" }


    var messageTextbox = jQuery('[name=message]')
    socket.emit('createMessage', {
        text
    }, function() {
        messageTextbox.val('')
    })
})


//*************************************** */
//  CLICK HANDLER FOR SEND locationMESSAGE
//*************************************** */
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        /* geolocation is NOT available */
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location')

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(err) {
        //11/22/2018 BDB - I added but not tested the err input parameter!!
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location.' + err)
    })
})