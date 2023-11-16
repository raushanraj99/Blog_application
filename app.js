const express = require("express");
const path = require("path")
const dotenv = require("dotenv");
const userRouter = require("./src/routes/routers")
const postRouter = require("./src/routes/postRouters")
const cookieParser = require("cookie-parser")
const Blogpost = require("./src/models/post")
const User = require("./src/models/user")

dotenv.config()

const app = express()
module.exports = app;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(path.resolve(),"public")))
app.use(cookieParser())
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use('',userRouter)
app.use('',postRouter)







app.get("/",async(req,res)=>{
 try {
   // const blog =await Blogpost.find({})
   // console.log(blog[0].createdAt.toString())

   const blogs = await Blogpost.aggregate([
      {
        $addFields: {
          createdAtDate: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
        },
      },
    ]);
    


   // finding user name and
   //  userinfo = []

   //  for (let i = 0;i<blogs.length;i++){
   //    //  console.log("Blogs id : ", blogs[i].user.toString())
   //    let userID = blogs[i].user.toString()
   //    console.log("User id : ",userID)
   //    let userval = await User.findById(userID)
   //    userinfo.push(userval)

   //  }

   //  console.log("only User : ",userinfo)
   res.render("index",{
      allPost:blogs,
   })


} catch (error) {
   console.log("Profile loading error")
   
}


})
