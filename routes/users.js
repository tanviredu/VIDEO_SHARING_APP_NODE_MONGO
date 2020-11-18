var express = require('express');
var router = express.Router();
var path   = require("path");
var multer = require("multer");
var Video  = require("../Model/Video");
var auth   = require("../auth/auth");

var multerstorage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(appRoot,'public/media'))
  },
  filename:function(req,file,cb){
    cb(null,req.session.user.username +"_"+file.originalname);
  }
});



var multerSingleUpload = multer({storage:multerstorage});






/* GET users listing. */
router.get('/home', auth.checkuser(),function(req, res, next) {
  //res.json(req.session.user);
  var currentUser = req.session.user;
  res.render("UserProfile/profile",{"user":currentUser});
  //res.json(cu);
});

router.get("/logout",auth.checkuser(),function(req,res,next){
  req.session.destroy();
  res.redirect("/login");
})

// inside the single the value will
// be the field name of the form

router.post("/post",multerSingleUpload.single("singlevideo"),(req,res,next)=>{
  console.log(req.body);
  console.log(req.file);
  var title = req.body.title;;
  var description = req.body.description;
  var videoUrl    = req.file.path;
  var videoName   = req.file.filename;
  var user_id     = req.session.user._id;
  var newVideo    = new Video({
    "title":title,
    "description":description,
    "videoUrl":videoUrl,
    "user":user_id,
    "videoName":videoName
  })
  newVideo.save((err,video)=>{
    if(err){
      next(err);
    }else{
      console.log("[+] Asset is saved");
      res.redirect("/users/home");
    }
    
  })
  //res.json({"title":title,"description":description,"filePath":filePath,"user_id":user_id});

})

router.get("/video_list",auth.checkuser(),(req,res)=>{
  var user_id = req.session.user._id;
  //console.log(user_id);
  Video.find({"user":user_id},(err,videos)=>{
    //console.log(videos)
    res.render("VideoList/videoList",{"videos":videos})  
  })
  
})


router.get("/video_details/:video_id",(req,res,next)=>{
  var video_id = req.params.video_id;
  Video.findById(video_id,(err,video)=>{
    if(err){
      next(err);
    }else{
        // make sure the url will not be a full
        // path it will be localhost:3000/public/media/<video>
        // remember the file that the server access [must be in ]
        // the directory that is for static in express
        // you can make multiple static directory in express
        var videodata = video;
        var name = "/media/"+video.videoName;
      res.render("VideoList/video_detail",{'url':name,'video':videodata});
    }
  })
})

module.exports = router;
