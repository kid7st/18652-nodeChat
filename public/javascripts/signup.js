$(document).ready(function(){
    $('#signup').submit(function(event){
        var data = {
            username: $('#username').val(),
            nickname: $('#nickname').val(),
            password: $('#password').val()
        }

        $.ajax({
            method: 'PUT',
            url: '/user/signup',
            data: data,
            success: function(response){
                console.log(response);
                if(response['code'] == 0){
                    $('#success-signup').show();
                    setTimeout(function(){
                        self.location = '/';
                    }, 2000);
                }else{
                    $('#fail-signup').show();
                    setTimeout(function(){
                        $('#fail-signup').hide();
                    }, 5000);
                }
            }
        });
        event.preventDefault();
    });
});
