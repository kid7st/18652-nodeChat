$(document).ready(function(){
    $('#login').submit(function(event){
        var data = {
            username: $('#username').val(),
            password: $('#password').val(),
        }

        $.ajax({
            method: 'POST',
            url: '/user/login',
            data: data,
            success: function(response){
                console.log(response);
                if(response['code'] == 0){
                    $('#success-login').show();
                    setTimeout(function(){
                        self.location = '/';
                    }, 1000);
                }else{
                    $('#fail-login').show();
                    setTimeout(function(){
                        $('#fail-login').hide();
                    }, 3000);
                }
            }
        });
        event.preventDefault();
    });
});
