var Ret = function(code, message, data) {
    this.code = code;
    this.message = message
    this.data = data;

    this.toJSON = function(){
        return {
            code : this.code,
            data : this.data
        };
    };
};

module.exports = Ret;
