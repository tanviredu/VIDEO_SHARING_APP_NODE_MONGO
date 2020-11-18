var express  = require('express');
var mongoose = require("mongoose");
var Video     = require("../Model/Video");
var router   = express.Router();


router.get("/",async (req,res,next)=>{
    await Video.find({})
    .populate("user")
    .then((videos)=>{
        res.render("index",{"videos":videos})
    },(err)=>{
        next(err);
    })
})



module.exports = router;