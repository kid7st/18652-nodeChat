var Ret = function(code, data) {
    this.code = code;
    this.data = data;

    this.toJSON = function(){
        return {
            code : this.code,
            data : this.data
        };
    };
};

module.exports = Ret;
