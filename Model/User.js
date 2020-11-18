const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");
const Schema   = mongoose.Schema;


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        default:"Unknown"
    },
    mobile:{
        type:String,
        default:"Unknown"
    },
    videos:{type:Schema.Types.ObjectId,ref:'video'}
    

})

// applying pre hooks
// this will automatically execute when a object
// is being created that is hashing the password
// its like a constructor method
// cant use arrow function here

userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        // only you change the username
        // or you just try to login
        // why return cause we dont go any further
        return next();
    }else{
        this.password = this.encryptPassword(this.password);
        next();
    }
    
})






// this is the prototype bes inheritence
// this method will be part of the
// object not the class
// that means when you create an object
// this will be method. not static method


userSchema.methods = {
    encryptPassword : function(plaintextPassword){
        if(!plaintextPassword){
            return ""
        }else{
            let salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plaintextPassword,salt);
        }
    },
    authenticate:function(plaintextPassword){
        // it will return a boolean
        // it will make the plaintextpassword hash
        // then this.password is already hashed so compare it
        return bcrypt.compareSync(plaintextPassword,this.password)
    }

}


module.exports = mongoose.model("user",userSchema)