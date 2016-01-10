$(document).ready(function(){
    $('#send').submit(function(event){
        content = $('#message').val();
        socket.emit('message', {
            title: '',
            content: content
        });

        console.log(content);
        event.preventDefault();
    });
});

var socket = io();

var currentUser = null;

socket.on('online_users', function(ret){
    if(ret.code == 0){
        var users = ret.data;
        for(username in users){
            var item = '<p class="bg-primary">' + users[username].nickname +'</p>';
            $('#online-users').append(item);
        }
    }
});

socket.on('msg_list', function(ret){
    if(ret.code == 0){
        var user = ret.data.currentUser;
        currentUser = user;
        var messages = ret.data.messages;

        for(i = messages.length - 1; i >= 0; i--){
            if(messages[i].author == user){
                var item = '<div class="bg-send">' +
                    '<p class="content">' + messages[i].content + '</p>' +
                    '<p class="text-muted">@' + messages[i].author + '</p>' +
                    '</div>'
                $('#messages-list').append(item);
            }else{
                var item = '<div class="bg-other">' +
                    '<p class="content">' + messages[i].content + '</p>' +
                    '<p class="text-muted">@' + messages[i].author + '</p>' +
                    '</div>'
                $('#messages-list').append(item);
            }
        }
    }
});

socket.on('broadcast_join', function(ret){
    if(ret.code == 0){
        var user = ret.data;
        var item = '<p class="bg-primary">' + user.nickname +'</p>';
        $('#online-users').append(item);
    }
});

socket.on('new_message', function(ret){
    if(ret.code == 0){
        message = ret.data;
        if(message.author == currentUser){
            var item = '<div class="bg-send">' +
                '<p class="content">' + message.content + '</p>' +
                '<p class="text-muted">@' + message.author + '</p>' +
                '</div>'
            $('#messages-list').append(item);
        }else{
            var item = '<div class="bg-other">' +
                '<p class="content">' + message.content + '</p>' +
                '<p class="text-muted">@' + message.author + '</p>' +
                '</div>'
            $('#messages-list').append(item);
        }

        var element = document.getElementById("messages-list");
        element.scrollTop = element.scrollHeight;
    }
});
