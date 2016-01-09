var socket = io();

socket.on('online_users', function(ret){
    console.log(ret['message']);
    console.log(ret['data']);
});

socket.on('msg_list', function(ret){
    console.log(ret['message']);
    console.log(ret['data']);
});

socket.on('broadcast_join', function(ret){
    console.log(ret['message']);
    console.log(ret['data']);
});

socket.on('new_message', function(ret){
    console.log(ret['message']);
    console.log(ret['data']);
});

socket.emit('message', {
    title: 'Hello',
    content: 'Hello, World'
});
