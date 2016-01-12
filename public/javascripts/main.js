$(document).ready(function(){
    $('#send').submit(function(event){
        content = $('#message').val();
        socket.emit('message', {
            title: '',
            content: content
        });

        $('#message').val('');

        event.preventDefault();
    });

    $('#logout').submit(function(event){
        $.ajax({
            method: 'POST',
            url: '/user/logout',
            success: function(response){
                console.log(response);
                if(response['code'] == 0){
                    setTimeout(function(){
                        self.location = '/user/login';
                    }, 1000);
                }
            }
        });
        event.preventDefault();
    });
});

var socket = io();

var currentUser = null;

socket.on('online_users', function(ret){
    if(ret.code == 0){
        var users = ret.data;
        for(username in users){
            var item = '<p id="' + username + '" class="bg-primary">' + users[username].nickname +'</p>';
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

        var element = document.getElementById("messages-list");
        element.scrollTop = element.scrollHeight;
    }
});

socket.on('broadcast_join', function(ret){
    if(ret.code == 0){
        var user = ret.data;
        var item = '<p id ="' + user.username + '" class="bg-primary">' + user.nickname +'</p>';
        $('#online-users').append(item);
    }
});

socket.on('broadcast_leave', function(ret){
    console.log(ret);
    if(ret.code == 0){
        var username = ret.data.username;
        console.log(username)
        $('#' + username).remove();
    }
})
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
