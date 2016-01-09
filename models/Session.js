var Session = {};

Session.loginRequired = function(req, res, next){
    console.log(req.session.user);
    if(!req.session.user){
        //res.send( (new Ret(-10, "Permission Errors, Login Required", {})).toJSON() );
        res.redirect("/user/login");
    }else{
        next();
    }
};

Session.login = function(req, user){
        req.session.user = user;
};

Session.logout = function(req){
        req.session.user = null;
};

module.exports = Session;
