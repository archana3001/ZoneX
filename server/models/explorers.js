const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    colour:{
        type:String,
        required:false
    },
    sides:{
        type:Number,
        required:true, 
    }
});

const UserModel = mongoose.model("explorers",UserSchema);

module.exports = UserModel;