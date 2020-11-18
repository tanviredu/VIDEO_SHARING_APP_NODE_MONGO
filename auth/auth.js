var User = require("../Model/User");

exports.checkuser = function(){
    return function(req,res,next){
        if(!req.session.user){
            res.redirect("/login");
            return;
        }
        next();
    }
}