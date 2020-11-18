var express  = require('express');
var mongoose = require("mongoose");
var User     = require("../Model/User");
var router   = express.Router();

/* GET THE REGISTRATION PAGE */
router.get('/register', function(req, res, next) {
  res.render('Auth/register');
});

/* GET THE POST DATA FROM THE REGISTRATION PAGE */
router.post("/auth/register",(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
    var profession = req.body.profession;
    var mobile     = req.body.mobile;

    var newUser = new User({"username":username,"password":password,"email":email,"profession":profession,"mobile":mobile})
    newUser.save((err,user)=>{
        if(err){
          return next(err);
        }
        else{
          //res.json(user);
          res.redirect("/login");      
        }
    })
})

/* GET THE LOGIN PAGE */
router.get('/login', function(req, res, next) {
  if(req.query.message){
    var message = req.query.message;
  }
  
  res.render('Auth/login',{"message":message});
});

/* GET THE POST DATA FROM THE LOGIN PAGE */
router.post("/auth/login",(req,res,next)=>{
  var username = req.body.username;
  var password = req.body.password;
    User.findOne({"username":username},(err,user)=>{
      if(!user){
        var message = "NO USER FOUND";
        res.redirect("/login?message="+message);
      }else{
        var is_authenticated = user.authenticate(password);
        if(is_authenticated){
          req.session.user = user;
          res.redirect("/users/home");
        }else{
          var message = "USERNAME OR PASSWORD WRONG";
          res.redirect("/login?message="+message);
        }
      }
    })
})



module.exports = router;
