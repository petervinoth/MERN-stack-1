const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');



const UserModel=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    displayName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }

});


module.exports=User=mongoose.model("user",UserModel);