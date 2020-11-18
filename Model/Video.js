const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const videoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
        required:true
    },
    publishDate:{
        type:Date,
        default:Date.now()
    },
    videoName:{
        type:String,
        required:true
    },
    user:{type:Schema.Types.ObjectId,ref:'user'},
    
    comments:{type:Schema.Types.ObjectId,ref:'comment'}
})

module.exports = mongoose.model("video",videoSchema);

