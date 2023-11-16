const { default: mongoose } = require("mongoose");

const registerUser = new mongoose.Schema({
   name:{
      type:String
   },
   email:{
      type:String,
   },
   password:{
      type:String,
   },
   blogs:[
      {
         type:mongoose.Types.ObjectId,
         ref:"blogpost"
      },
   ]
   
},{timestamps:true})

const User = mongoose.model("userauth",registerUser);

module.exports= User;