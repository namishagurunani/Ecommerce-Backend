const mongoose = require( 'mongoose' );
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true
    },
    role:{
        type:String,
        require: true
    }
});


userSchema.pre("save" , function(){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password,salt);
    this.password=hash;
   
});

const UserModel = mongoose.model("users",userSchema);

module.exports = UserModel;  //creating a model called