const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unqiue:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isVerified:{
            type: Boolean, 
            default: false 
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("User" , userSchema)