var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var commentSchema = new Schema({
    text:{
        type:String,
        required:true
    },

    author:{type:Schema.Types.ObjectId,ref:'user'}
})

module.exports = mongoose.model("comment",commentSchema)