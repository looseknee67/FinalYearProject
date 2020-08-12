var socket = io.connect('http://localhost:3000');


            // submit text message without reload/refresh the page
            $('form').submit(function(e){
                e.preventDefault(); // prevents page reloading
                socket.emit('chat_message',  $('#txt').val());
                $('#txt').val('');
                return false;
            });

            // append the chat text message
            socket.on('chat_message', function(msg){
                $('#messages').append($('<div>').html(msg));
               
            });

            // append text if someone is online
            socket.on('status', function(username) {
                $('#messages').append($('<div>').html(username));
            });

         
           