const { default: mongoose } = require("mongoose");

const Posts =new mongoose.Schema({
      title:{
         type:String,
      },
      description:{
         type:String,
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "userAuth", // Reference the model name
       },
},{timestamps:true})
 
const Blogpost=mongoose.model("blogpost",Posts) 

module.exports  = Blogpost;